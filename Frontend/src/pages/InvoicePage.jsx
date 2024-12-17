import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiurl from '../lib/urls'


const InvoicePage = () => {
    const { bookingId } = useParams(); // Get bookingId from the URL
    const [invoiceData, setInvoiceData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await axios.get(`${apiurl}/bookings/${bookingId}/invoiceData`);
                setInvoiceData(response.data);  // Set invoice data
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        };
        
        // Set the PDF download URL
        setPdfUrl(`${apiurl}/bookings/${bookingId}/invoicePDF`);

        fetchInvoiceData();  // Fetch invoice data from the server
    }, [bookingId]);

    const handleDownload = () => {
        window.location.href = pdfUrl;  // Trigger PDF download
    };

    if (!invoiceData) return <p className="text-center mt-10">Loading invoice...</p>;

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664368832311-7fe635e32c7c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
            {/* Background overlay */}
            <div className="absolute inset-0 bg-white opacity-50"></div>

            {/* Content */}
            <div className="relative flex flex-col justify-center items-center h-screen z-10 max-w-2xl mx-auto mt-10 p-6 my-24 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Invoice</h1>
                <div className="space-y-4 text-lg text-gray-800">
                    <p><strong>Name:</strong> {invoiceData.name}</p>
                    <p><strong>Email:</strong> {invoiceData.email}</p>
                    <p><strong>Phone:</strong> {invoiceData.phone}</p>
                    <p><strong>Package:</strong> {invoiceData.package}</p>
                    <p className="font-semibold"><strong>Total Price:</strong> ${invoiceData.totalPrice}</p>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleDownload}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
