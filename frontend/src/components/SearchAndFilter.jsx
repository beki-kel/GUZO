import React, { useState } from 'react';
import '../components/styles/searchAndFilter.css'; // Import the CSS file
import axios from 'axios';

const SearchAndFilter = () => {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [addflight, setAddflight] = useState(false);
    const [addCar, setAddCar] = useState(false);
    const [showflightOptions, setShowflightOptions] = useState(false);
    const [showCarOptions, setShowCarOptions] = useState(false);
    const [showPackageOptions, setShowPackageOptions] = useState(false);
    const [showThingsToDoOptions, setShowThingsToDoOptions] = useState(false);
    const [showCruiseOptions, setShowCruiseOptions] = useState(false);
    const [accommodationType, setAccommodationType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleServiceSelection = (service) => {
        setShowflightOptions(false);
        setShowCarOptions(false);
        setShowPackageOptions(false);
        setShowThingsToDoOptions(false);
        setShowCruiseOptions(false);

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
                    accommodationType:accommodationType,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                });
                setSearchResults(response.data);
                console.log("this is the data i found",response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error searching hotels:', error);
                setLoading(false);
            }
        }
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
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
                        <input type="text" placeholder="Accommodation Type" value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} />
                        <input type="text" placeholder='Minimun Price' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <input type="text" placeholder='Maximum Price' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
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
            {showModal && selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        {/* Render details of selectedItem here */}
                        <p>{selectedItem.name}</p>
                        <p>{selectedItem.description}</p>
                        {/* Add more details as needed */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndFilter;
