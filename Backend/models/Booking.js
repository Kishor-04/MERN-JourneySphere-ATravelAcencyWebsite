const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfTravelers: { type: Number, required: true },
    specialRequests: { type: String },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
