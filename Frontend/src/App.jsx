import React from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PackageDetailPage from './pages/PackageDetailPage';
import InvoicePage from './pages/InvoicePage';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to='/login' />
      }

    return (
        <Router>
            <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/package/:id" element={<PackageDetailPage />} />
                <Route path="/invoice/:bookingId" element={<InvoicePage />} />
                <Route path="/admin" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<PrivateRoute element={<AdminPage />} />} />
            </Routes>
        </Router>
    );
}

export default App;
