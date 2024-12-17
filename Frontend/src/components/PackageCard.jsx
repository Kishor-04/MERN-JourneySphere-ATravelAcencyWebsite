import React from 'react';

const PackageCard = ({ pkg, onBookNow }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <img src={pkg.image} alt={pkg.title} className="h-40 w-full object-cover rounded-t-lg" />
            <h2 className="text-xl font-bold">{pkg.title}</h2>
            <p className="text-gray-700">{pkg.description}</p>
            <p className="text-green-600 font-semibold">Price: ${pkg.price}</p>
            <button 
                className="bg-blue-500 text-white mt-4 py-2 px-4 rounded"
                onClick={() => onBookNow(pkg)}
            >
                Book Now
            </button>
        </div>
    );
};

export default PackageCard;
