import React, { useState } from 'react';
import '../components/styles/searchAndFilter.css'; // Import the CSS file
import axios from 'axios';

const SearchAndFilter = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [addflight, setAddflight] = useState(false);
    const [addCar, setAddCar] = useState(false);
    const [showflightOptions, setShowflightOptions] = useState(false); // State to manage visibility of flight options
    const [showCarOptions, setShowCarOptions] = useState(false); // State to manage visibility of car options
    const [showPackageOptions, setShowPackageOptions] = useState(false); // State to manage visibility of package options
    const [showThingsToDoOptions, setShowThingsToDoOptions] = useState(false); // State to manage visibility of Things to Do options
    const [showCruiseOptions, setShowCruiseOptions] = useState(false); // State to manage visibility of Cruise options
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);


    const handleServiceSelection = (service) => {
        // Logic to handle service selection
        setShowflightOptions(false); // Hide flight options by default
        setShowCarOptions(false); // Hide car options by default
        setShowPackageOptions(false); // Hide package options by default
        setShowThingsToDoOptions(false); // Hide Things to Do options by default
        setShowCruiseOptions(false); // Hide Cruise options by default

        switch (service) {
            case 'flights':
                setShowflightOptions(true);
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

    const handleSearch = async () => {
        if (!showflightOptions && !showCarOptions && !showPackageOptions && !showThingsToDoOptions && !showCruiseOptions) {
            try {
                setLoading(true);
                const response = await axios.post('/search/filter/Accomadation', {
                    name: location,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });
                setSearchResults(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error searching hotels:', error);
                // Handle error here
                setLoading(false);
            }
        }
    };

    return (
        <div className="search-container">
            <div className="service-buttons">
                <button onClick={() => handleServiceSelection('stays')}>Stays</button>
                <button onClick={() => handleServiceSelection('flights')}>flights</button>
                <button onClick={() => handleServiceSelection('cars')}>Cars</button>
                <button onClick={() => handleServiceSelection('packages')}>Packages</button>
                <button onClick={() => handleServiceSelection('thingsToDo')}>Things to Do</button>
                <button onClick={() => handleServiceSelection('cruises')}>Cruises</button>
            </div>
            <div className="search-inputs">
                {!showflightOptions && !showCarOptions && !showPackageOptions && !showThingsToDoOptions && !showCruiseOptions && (
                    <>
                        <input type="text" placeholder="Going to" value={location} onChange={(e) => setLocation(e.target.value)} />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type="number" value={travelers} onChange={(e) => setTravelers(e.target.value)} />
                    </>
                )}
                {showflightOptions && (
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
                            <div style={{ display: 'flex' }}>
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
                            <div style={{ display: 'flex' }}>
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
                    <input type="checkbox" checked={addflight} onChange={() => setAddflight(!addflight)} />
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
