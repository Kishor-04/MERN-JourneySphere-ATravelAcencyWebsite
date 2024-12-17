import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ packageId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        numberOfTravelers: 1,
        specialRequests: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/bookings', {
                ...formData,
                packageId,
            });
            alert('Booking successful!');
            setIsSubmitted(true);
            window.location.href = `/invoice/${response.data._id}`; // Redirect to invoice page
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Booking failed. Please try again.');
        }
    };

    if (isSubmitted) {
        return <p className="text-green-600 text-center">Booking submitted successfully!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Book Your Package</h2>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Number of Travelers</label>
                <input
                    type="number"
                    name="numberOfTravelers"
                    value={formData.numberOfTravelers}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Special Requests</label>
                <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Booking
            </button>
        </form>
    );
};

export default BookingForm;
