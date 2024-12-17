import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarAdmin from '../components/NavbarAdmin';
import apiurl from '../lib/urls'
const AdminPage = () => {
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', price: '', availableDates: '', image: '' });
    const [editingPackage, setEditingPackage] = useState(null);

    // Fetch packages from backend
    const fetchPackages = async () => {
        console.log(apiurl);
        const response = await axios.get(`${apiurl}/packages`);
        setPackages(response.data);
    };

    // Fetch all bookings for the admin
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${apiurl}/admin/bookings`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            alert('Error fetching bookings:', error)
        }
    };

    useEffect(() => {
        fetchPackages();
        fetchBookings();
    }, []);

    // Handle add or edit package
    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            if (editingPackage) {
                // Update package if editing
                await axios.put(`${apiurl}/admin/packages/${editingPackage._id}`, formData);
                alert("Edited Successfully");
            } else {
                // Add new package
                await axios.post(`${apiurl}/admin/packages`, formData);
                alert("Added Successfully");
            }
            setEditingPackage(null);
            fetchPackages();
            setFormData({ title: '', description: '', price: '', availableDates: '', image: '' });
        } catch (error) {
            console.error('Error adding/editing package:', error);
        }
    };

    // Handle delete package
    const handleDeletePackage = async (id) => {
        try {
            await axios.delete(`${apiurl}/admin/packages/${id}`);
            alert("Deleted Successfully");
            fetchPackages();

        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    // Handle edit package
    const handleEditPackage = (pkg) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            availableDates: pkg.availableDates.join(', '),
            image: pkg.image,
        });
    };

    return (
        <div>
            <div className="relative min-h-screen bg-cover bg-center  " style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
                <NavbarAdmin />

                {/* Content */}
                <div className="relative container mx-auto p-6 rounded-lg shadow-lg my-8">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>

                    {/* Add/Edit Package Form */}
                    <form onSubmit={handleAddPackage} className="mb-8 bg-white p-10 rounded">
                        <h2 className="text-2xl font-semibold mb-4">{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
                        <div className="grid grid-cols-1 gap-6">
                            <input
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="border rounded px-4 py-2 focus:ring-2 bg-blue-50  focus:ring-blue-500"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="border rounded px-4 py-2 focus:ring-2 bg-blue-50 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="border rounded px-4 py-2 focus:ring-2 bg-blue-50 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Available Dates (comma-separated)"
                                name="availableDates"
                                value={formData.availableDates}
                                onChange={(e) => setFormData({ ...formData, availableDates: e.target.value.split(',') })}
                                className="border rounded px-4 py-2 focus:ring-2 bg-blue-50 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                name="image"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="border rounded px-4 py-2 focus:ring-2 bg-blue-50 focus:ring-blue-500"
                            />
                            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-500 focus:outline-none">
                                {editingPackage ? 'Update Package' : 'Add Package'}
                            </button>
                        </div>
                    </form>

                    <br />

                    {/* Manage Packages */}
                    <h2 className="text-3xl font-bold mb-4">Manage Packages</h2>
                    <ul>
                        {Array.isArray(packages) && packages.length > 0 ? (
                            packages.map(pkg => (
                                <li key={pkg._id} className="mb-6 p-6 border rounded-lg shadow bg-gray-50">
                                    <h3 className="font-bold text-xl">{pkg.title}</h3>
                                    <p>{pkg.description}</p>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleEditPackage(pkg)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePackage(pkg._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No packages found.</p>
                        )}
                    </ul>

                    <br /><br /><br />

                    {/* Bookings List */}
                    <h2 className="text-3xl font-bold mb-4">Bookings</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <li key={booking._id} className="mb-6 p-6 border rounded-lg shadow bg-gray-50">
                                <h3 className="font-bold text-xl">
                                    {booking.packageId ? booking.packageId.title : 'Package Not Found'}
                                </h3>
                                <p><strong>Customer:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Phone:</strong> {booking.phone}</p>
                                <p><strong>Number of Travelers:</strong> {booking.numberOfTravelers}</p>
                                <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>

    );
};

export default AdminPage;
