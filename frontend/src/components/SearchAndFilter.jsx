import React, { useState } from 'react';
import '../components/styles/searchAndFilter.css'; // Import the CSS file

const SearchAndFilter = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [addFlight, setAddFlight] = useState(false);
    const [addCar, setAddCar] = useState(false);
    const [showFlightOptions, setShowFlightOptions] = useState(false); // State to manage visibility of flight options
    const [showCarOptions, setShowCarOptions] = useState(false); // State to manage visibility of car options
    const [showPackageOptions, setShowPackageOptions] = useState(false); // State to manage visibility of package options
    const [showThingsToDoOptions, setShowThingsToDoOptions] = useState(false); // State to manage visibility of Things to Do options
    const [showCruiseOptions, setShowCruiseOptions] = useState(false); // State to manage visibility of Cruise options


    const handleServiceSelection = (service) => {
        // Logic to handle service selection
        setShowFlightOptions(false); // Hide flight options by default
        setShowCarOptions(false); // Hide car options by default
        setShowPackageOptions(false); // Hide package options by default
        setShowThingsToDoOptions(false); // Hide Things to Do options by default
        setShowCruiseOptions(false); // Hide Cruise options by default

        switch (service) {
            case 'flights':
                setShowFlightOptions(true);
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
            case 'cruises':
                setShowCruiseOptions(true);
                break;
            default:
                break;
        }
    };

    const handleSearch = () => {
        // Logic to handle search
    };

    return (
        <div className="search-container">
            <div className="service-buttons">
                <button onClick={() => handleServiceSelection('stays')}>Stays</button>
                <button onClick={() => handleServiceSelection('flights')}>Flights</button>
                <button onClick={() => handleServiceSelection('cars')}>Cars</button>
                <button onClick={() => handleServiceSelection('packages')}>Packages</button>
                <button onClick={() => handleServiceSelection('thingsToDo')}>Things to Do</button>
                <button onClick={() => handleServiceSelection('cruises')}>Cruises</button>
            </div>
            <div className="search-inputs">
                {!showFlightOptions && !showCarOptions && !showPackageOptions && !showThingsToDoOptions && !showCruiseOptions && (
                    <>
                        <input type="text" placeholder="Going to" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
                    </>
                )}
                {showFlightOptions && (
                    <>
                        {/* Place your flight options buttons and inputs here */}
                        <div>
                            <div>
                                <button>Button 1</button>
                                <button>Button 2</button>
                                <button>Button 3</button>
                                <button>Button 4</button>
                            </div>
                            <div style={{ display: "flex" }}>
                                <input type="text" placeholder="Input 1" />
                                <input type="text" placeholder="Input 2" />
                                <input type="text" placeholder="Input 3" />
                                <input type="text" placeholder="Input 4" />
                            </div>
                        </div>


                    </>
                )}
                {showPackageOptions && (
                    <>
                        {/* Place your package options buttons and inputs here */}
                        <div>
                            <div>
                                <button>Button 1</button>
                                <button>Button 2</button>
                                <button>Button 3</button>
                            </div>
                            <div style={{display:'flex'}}>
                                <select>
                                    <option>Select</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                                <input type="text" placeholder="Input 1" />
                                <input type="text" placeholder="Input 2" />
                                <input type="text" placeholder="Input 3" />
                                <input type="text" placeholder="Input 4" />
                            </div>

                        </div>


                    </>
                )}
                {showCarOptions && (
                    <>
                        {/* Place your car options buttons and inputs here */}
                        <div>
                            <div>
                                <button>Button 1</button>
                                <button>Button 2</button>
                            </div>
                            <div style={{display:'flex'}}>
                                <input type="text" placeholder="Input 1" />
                                <input type="text" placeholder="Input 2" />
                                <input type="text" placeholder="Input 3" />
                                <input type="text" placeholder="Input 4" />
                                <input type="text" placeholder="Input 5" />
                            </div>
                        </div>


                    </>
                )}
                {showThingsToDoOptions && (
                    <>
                        <input type="text" placeholder="Input 1" />
                        <input type="text" placeholder="Input 2" />
                    </>
                )}
                {showCruiseOptions && (
                    <>
                        <input type="text" placeholder="Input 1" />
                        <input type="text" placeholder="Input 2" />
                        <input type="text" placeholder="Input 3" />
                    </>
                )}
            </div>
            <div className="search-inputs">
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="add-options">
                <label>
                    <input type="checkbox" checked={addFlight} onChange={() => setAddFlight(!addFlight)} />
                    Add a flight
                </label>
                <label>
                    <input type="checkbox" checked={addCar} onChange={() => setAddCar(!addCar)} />
                    Add a car
                </label>
            </div>
        </div>
    );
};

export default SearchAndFilter;
