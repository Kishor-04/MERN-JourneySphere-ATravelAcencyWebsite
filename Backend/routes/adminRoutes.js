const express = require('express');
const Package = require('../models/Package');
const Booking = require('../models/Booking');
const router = express.Router();

// POST:Add a new package
router.post('/packages', async (req, res) => {
    const { title, description, price, availableDates, image } = req.body;

    try {
        const newPackage = new Package({ title, description, price, availableDates, image });
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update a package
router.put('/packages/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE:  Remove a package
router.delete('/packages/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all bookings for admin
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        console.log(bookings);
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

module.exports = router;
