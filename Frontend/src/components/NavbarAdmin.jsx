// Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    
    const navigate = useNavigate();
    

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
      }, []);
    
      const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        
        setTimeout(() => {
          navigate('/');
        }, 1000)
        console.log('Loggedout Successfully');
        alert("Loggedout Successfully");
      }
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-semibold">
                JourneySphere
                </Link>
                <button className='text-white text-sm bg-blue-700 px-4 py-2 hover:bg-blue-600 border-none text-[20px] rounded-[6px] p-[8px] cursor-pointer my-auto mx-0' onClick={handleLogout}>Logout</button>
            </div>
        </nav>
        
    );
};

export default NavbarAdmin;
