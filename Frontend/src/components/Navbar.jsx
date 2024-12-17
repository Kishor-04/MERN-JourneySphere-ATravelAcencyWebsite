// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-semibold">
                JourneySphere
                </Link>
                <Link
                    to="/admin"
                    className="text-white text-sm bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
                >
                    Admin
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
