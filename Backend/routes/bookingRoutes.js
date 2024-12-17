const express = require('express');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { generateInvoice } = require('../helpers/invoiceGenerator');

const router = express.Router();

// POST new booking
router.post('/', async (req, res) => {
    const { name, email, phone, numberOfTravelers, specialRequests, packageId } = req.body;

    try {
        const pkg = await Package.findById(packageId);
        if (!pkg) return res.status(404).json({ message: "Package not found" });

        const totalPrice = pkg.price * numberOfTravelers;

        const booking = new Booking({
            name,
            email,
            phone,
            numberOfTravelers,
            specialRequests,
            packageId,
            totalPrice,
        });

        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id/invoiceData', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('packageId');
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const packageDetails = booking.packageId;  // Already populated
        if (!packageDetails) return res.status(404).json({ message: "Package not found" });

        const invoiceData = {
            name: booking.name,
            email: booking.email,
            phone: booking.phone,
            package: packageDetails.title,
            totalPrice: booking.totalPrice,
        };

        res.status(200).json(invoiceData);  // Send invoice data as JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id/invoicePDF', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('packageId');
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        const packageDetails = booking.packageId;
        if (!packageDetails) return res.status(404).json({ message: "Package not found" });

        const pdfBytes = await generateInvoice(booking, packageDetails);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice-${booking._id}.pdf`);
        res.setHeader('Content-Length', pdfBytes.length); // Set content length to avoid incomplete download
        res.send(pdfBytes);  // Send the PDF as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
