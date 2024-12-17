const express = require('express');
const Package = require('../models/Package');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ message: "Package not found" });
        res.json(pkg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a package
router.put('/admin/packages/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, price, availableDates, image } = req.body;

    try {
        const updatedPackage = await Package.findByIdAndUpdate(id, {
            title,
            description,
            price,
            availableDates,
            image,
        }, { new: true });

        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found' });
        }

        res.status(200).json(updatedPackage);
    } catch (error) {
        console.error('Error updating package:', error);
        res.status(500).json({ error: 'Failed to update package' });
    }
});


module.exports = router;
