// HomePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import apiurl from '../lib/urls'

const HomePage = () => {
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await axios.get(`${apiurl}/packages`);
                setPackages(response.data);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };

        fetchPackages();
    }, []);

    if (packages.length === 0) {
        return (
            <div className="relative min-h-screen bg-cover bg-center " style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }} >
            <Navbar />

            <div className=" flex flex-col justify-center h-[60vh] items-center mt-10">
                
                <h1 className="text-3xl flex flex-col justify-center items-center text-black font-bold mb-4">No packages available at the moment.</h1>
                <button
                    onClick={() => navigate('/admin')}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Go to Admin Panel
                </button>
            </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-cover bg-center " style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            <Navbar />
            <div className="container mx-auto mt-20 p-4  text-white">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Available Tour Packages</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg._id} className="border rounded-lg shadow-lg bg-white p-4">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-gray-700 text-xl font-bold mb-2">{pkg.title}</h2>
                            <p className="text-gray-700 mb-2">{pkg.description.substring(0, 100)}...</p>
                            <p className="text-gray-700 font-semibold mb-2">Price: ${pkg.price} per person</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Available Dates: {pkg.availableDates.join(', ')}
                            </p>
                            <button
                                onClick={() => (window.location.href = `/package/${pkg._id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
