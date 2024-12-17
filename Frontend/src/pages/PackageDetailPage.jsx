import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import apiurl from '../lib/urls'


const PackageDetailPage = () => {
    const { id } = useParams(); // Get the package ID from the URL
    const [packageDetails, setPackageDetails] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`${apiurl}/packages/${id}`);
                setPackageDetails(response.data);
            } catch (error) {
                console.error('Error fetching package details:', error);
            }
        };

        fetchPackageDetails();
    }, [id]);

    if (!packageDetails) {
        return <p>Loading package details...</p>;
    }

    return (
        <div className="relative min-h-screen bg-center" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            {/* Background overlay */}

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto mt-16 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">{packageDetails.title}</h1>
                <img
                    src={packageDetails.image}
                    alt={packageDetails.title}
                    className="w-full h-80 object-cover rounded-lg mb-6 shadow-lg"
                />
                <p className="text-lg text-gray-700 mb-2"><strong>Description:</strong> {packageDetails.description}</p>
                <p className="text-lg text-gray-700 mb-2"><strong>Price:</strong> ${packageDetails.price} per person</p>
                <p className="text-lg text-gray-700 mb-6">
                    <strong>Available Dates:</strong> {packageDetails.availableDates.join(', ')}
                </p>

                {!showBookingForm ? (
                    <button
                        onClick={() => setShowBookingForm(true)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Book Now
                    </button>
                ) : (
                    <BookingForm packageId={id} />
                )}
            </div>
        </div>
    );
};

export default PackageDetailPage;
