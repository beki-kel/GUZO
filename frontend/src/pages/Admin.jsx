// AdminDashboard.js

import React, { useState } from 'react';
import './styles/Admin.css'; // Import CSS for styling
import AccommodationForm from './AdminPages/AccommodationAdmin';
import HotelForm from './AdminPages/HotelAdmin';
import TransportationForm from './AdminPages/TransportationAdmin';
import PackageForm from './AdminPages/PackagesAdmin';
import ThingsToDoForm from './AdminPages/ThingsToDoAdmin';

const AdminDashboard = () => {
    const [showHomeOptions, setShowHomeOptions] = useState(true); // Set to true by default
    const [showSettingsOptions, setShowSettingsOptions] = useState(false);
    const [showAccommodationOptions, setShowAccommodationOptions] = useState(false);
    const [showDiningOptions, setShowDiningOptions] = useState(false);
    const [showCarOptions, setShowCarOptions] = useState(false);
    const [showPackageOptions, setShowPackageOptions] = useState(false);
    const [showThingsToDoOptions, setShowThingsToDoOptions] = useState(false);

    const handleServiceSelection = (service) => {
        setShowHomeOptions(false);
        setShowSettingsOptions(false);
        setShowAccommodationOptions(false);
        setShowDiningOptions(false);
        setShowCarOptions(false);
        setShowPackageOptions(false);
        setShowThingsToDoOptions(false);

        switch (service) {
            case 'home':
                setShowHomeOptions(true);
                break;
            case 'settings':
                setShowSettingsOptions(true);
                break;
            case 'accommodation':
                setShowAccommodationOptions(true);
                break;
            case 'dinnings':
                setShowDiningOptions(true);
                break;
            case 'cars':
                setShowCarOptions(true);
                break;
            case 'packages':
                setShowPackageOptions(true);
                break;
            case 'thingsToDo':
                setShowThingsToDoOptions(true);
                break;
            default:
                break;
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <h2>Admin Dashboard</h2>
                <div className="admin-links">
                    <button onClick={() => handleServiceSelection('home')} className="admin-link">Home</button>
                    <button onClick={() => handleServiceSelection('settings')} className="admin-link">Settings</button>
                    <button onClick={() => handleServiceSelection('accommodation')} className="admin-link">Accommodation</button>
                    <button onClick={() => handleServiceSelection('dinnings')} className="admin-link">Dining</button>
                    <button onClick={() => handleServiceSelection('cars')} className="admin-link">Transportation</button>
                    <button onClick={() => handleServiceSelection('packages')} className="admin-link">Packages</button>
                    <button onClick={() => handleServiceSelection('thingsToDo')} className="admin-link">Things to Do</button>
                </div>
            </div>
            <div className="admin-content">
                {showHomeOptions && (
                    <div>
                        {/* Content for Home Options */}
                        <h3>Home Options</h3>
                        {/* Add your specific content for home options here */}
                    </div>
                )}
                {showSettingsOptions && (
                    <div>
                        {/* Content for Settings Options */}
                        <h3>Settings Options</h3>
                        {/* Add your specific content for settings options here */}
                    </div>
                )}
                {showAccommodationOptions && (
                    <div>
                        {/* Content for Accommodation Options */}
                        <h3>Accommodation Options</h3>
                        <AccommodationForm />
                        {/* Add your specific content for accommodation options here */}
                    </div>
                )}
                {showDiningOptions && (
                    <div>
                        {/* Content for Dining Options */}
                        <h3>Dining Options</h3>
                        <HotelForm />
                        {/* Add your specific content for dining options here */}
                    </div>
                )}
                {showCarOptions && (
                    <div>
                        {/* Content for Car Options */}
                        <h3>Car Options</h3>
                        <TransportationForm />
                        {/* Add your specific content for car options here */}
                    </div>
                )}
                {showPackageOptions && (
                    <div>
                        {/* Content for Package Options */}
                        <h3>Package Options</h3>
                        <PackageForm />
                        {/* Add your specific content for package options here */}
                    </div>
                )}
                {showThingsToDoOptions && (
                    <div>
                        {/* Content for Things to Do Options */}
                        <h3>Things to Do Options</h3>
                        <ThingsToDoForm/>
                        {/* Add your specific content for things to do options here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
