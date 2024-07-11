import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faCalendar,faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AutoComplete } from "primereact/autocomplete";
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import StayFilterSection from './StayFilterSection'
import FlightFillter from './FlightFillter';
import RideFilter from './RideFilter';

function SearchAndFilter( ) {
    const [section, setSection] = useState('stays');
    const [twoWay, setTwoWay] = useState(false)
    const [filterState , setFilterState] = useState('')
    const [stayLocation, setStaylocation] = useState('');
    const [flightDepLocation, setFlightDepLocation] = useState('');
    const [flightArrLocation, setFlightArrLocation] = useState('');
    const [flightDepdates, setFlightDepdates] = useState('');
    const [flightArrDates, setFlightArrDates] = useState('')
    const [rideDepLocation, setRideDepLocation] = useState('');
    const [rideArrLocation, setRideArrLocation] = useState('');
    const [dates, setdates] = useState([new Date(), new Date()]);
    const [Ridetravllers, setRideTravllers] = useState('');
    const [stayTravllers,setstayTravllers] = useState('');
    const [filteredCities, setFilteredCities] = useState(null);
    const [stayResponse, setStayResponse]= useState('');
    const [stayLoading, setStayLoading] = useState(false);
    const [stayError, setStayError] = useState(null);
    const [flightResponse, setFlightResponse]= useState('');
    const [flightLoading, setFlightLoading] = useState(false);
    const [flightError, setFlightError] = useState(null);
    const [rideResponse, setRideResponse]= useState('');
    const [rideLoading, setRideLoading] = useState(false);
    const [rideError, setRideError] = useState(null);

    const cities = [
        'Addis Ababa', 'Arba Minch', 'Assosa', 'Axum', 'Bahir Dar', 'Bale Robe', 'Dembidollo', 'Dire Dawa', 
        'Gambella', 'Gode', 'Gonder', 'Hawassa', 'Humera', 'Jijiga', 'Jimma', 'Jinka', 'Kabri Dar', 
        'Kombolcha', 'Lalibela', 'Mekelle', 'Semera', 'Shire','Adama'
    ];

    const search = (event) => {
        setTimeout(() => {
            let _filteredCities;
            if (!event.query.trim().length) {
                _filteredCities = [...cities];
            } else {
                _filteredCities = cities.filter((city) => {
                    return city.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            setFilteredCities(_filteredCities);
        }, 250);
    };

    const setcolor = (curr) => section === curr ? 'text-orange-600 border-b-2 border-orange-600' : 'text-black';

    const handleTwoWay = (e) => {
        setTwoWay(e.target.checked);
        setFlightArrDates('');
    };
    
    const handleSubmitStays = async () => {
        if(!stayLocation|| !stayTravllers || !dates){alert('Please fill all the fields '); setFilterState('');}
        else{
            setFilterState('stays');
            setStayLoading(true);
            setStayResponse(null);
            setStayError(null);
            try {
                setTimeout(async () => {
                    try {
                        const response = await axios.post('http://localhost:5000/search/filter/Accomadation', {stayLocation,stayTravllers});
                        if (response.status === 200 && response.data[0]) {
                            setStayResponse(response.data);
                            setStayLoading(false);
                            console.log(response);
                        }
                        else if (!response.data || !response.data[0]) {
                            setStayError('No result Found');
                            setStayLoading(false);
                        } else {
                            setStayError('Error Getting Results Please Try Again');
                            setStayLoading(false);
                        }
                    } catch (error) {
                        setStayLoading(false);
                        if (error.response) {
                            setStayError(error.response.data.message || 'An error occurred during Search Please Try Again');
                        } else {
                            setStayError('An error occurred during search');
                        }
                    }
                });
            } catch (error) {
                setStayLoading(false);
                setStayError('An unexpected error occurred');
                console.error(error);
            }
        }
    };
    

    const handleSubmitFlight = async () => {
        const departureDate = new Date(flightDepdates);
        const arrivalDate = new Date(flightArrDates);
    
        // Validate dates
        if (arrivalDate <= departureDate) {
            alert('Return date must be after the departure date.');
            return;
        }
    
        // Validate fields
        if (!flightDepLocation || !flightArrLocation || !flightDepdates) {
            alert('Please fill all the fields.');
            return;
        }
        setFilterState('flight');
        setFlightLoading(true);
        setFlightResponse(null);
        setFlightError(null);

        try {
            const response = await axios.post('http://localhost:5000/search/flight', {
                flightArrLocation,
                flightDepLocation,
                flightDepdates,
                flightArrDates
            });
            const { outboundFlights } = response.data;
            if (response.status === 200 && outboundFlights.length > 0) {
                setFlightResponse(response.data);
                setFlightLoading(false);
                console.log(response);
            }
            else if (response.status === 204 || outboundFlights.length === 0){
                setFlightError('No result Found');
                setFlightLoading(false);
            }
            else {
                setFlightError('Error Getting Results Please Try Again');
                setFlightLoading(false);
            }
        } catch (error) {
            setFlightLoading(false);
            if (error.response) {
                setFlightError(error.response.data.message || 'An error occurred during Flight Search. Please try again.');
            } else {
                setFlightError('An error occurred during Flight Search. Please try again.');
            }
            console.error('Error occurred during flight search:', error.message);
        }
    };
    
    const handleSubmitRide = async () => {
        if(!rideDepLocation || !rideArrLocation){
            alert('Please select a city.')
            return
        }
        setFilterState('Ride');
        setRideLoading(true);
        setRideResponse(null);
        setRideError(null);

            try {
                const response = await axios.post("http://localhost:5000/search/transportation", 
                    {rideArrLocation,rideDepLocation,Ridetravllers});
                if (response.status === 200 && response.data[0]) {
                    console.log('Response status:', response.status);
                    console.log(response.data);
                    setRideResponse(response.data);
                    setRideLoading(false);
                }else if(!response.data[0]){
                    setRideError('No result Found');
                    setRideLoading(false);
                }
                else {
                    setRideError('Error Getting Results Please Try Again');
                    setRideLoading(false)
                }
            } catch (error) {
                setRideLoading(false);
                if (error.response) {
                    setRideError(error.response.data.message || 'An error occurred during Ride Search. Please try again.');
                } else {
                    setRideError('An error occurred during Ride Search. Please try again.');
                }
                console.log(error);
    }
    }
    const renderSection = () => {
    switch (section){
        case 'stays':
            return <div className='w-full flex space-x-10 justify-center items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <div className='flex border-2  rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center p-2'>
                                <p className='text-xl font-medium'> Location</p>
                                <AutoComplete 
                                    inputClassName="border-none focus:border-none focus:outline-none px-2 text-center"
                                    value={stayLocation} 
                                    suggestions={filteredCities} 
                                    completeMethod={search} 
                                    onChange={(e) => setStaylocation(e.value)} 
                                    panelClassName="bg-white border border-gray-300 shadow-md"
                                    itemTemplate={(item) => (
                                        <div className="p-2 hover:bg-gray-200 focus:bg-gray-200">{item}</div>
                                    )}
                                    placeholder='Where?'
                                />
                            </div>
                        </div>

                        <div className='flex border-2 rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Dates </p>
                                <DateRangePicker format="dd.MM.yyyy" character=" – "  appearance="default" placeholder='Start date -End date' value={dates} onChange={(dates) => setdates(dates) } style={{ zIndex: 30 }} />
                            </div>
                        </div>

                        <div className='flex border-2  rounded-2xl p-3 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faUser} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Travllers </p>
                                <input type="number" placeholder='Travellers, Rooms' value={stayTravllers} onChange={(e) => setstayTravllers(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>
                        
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium' onClick={handleSubmitStays}> Search </button>
                    </div>;
        case 'flights':
            return (
                <div className='w-full flex space-x-10 justify-center items-center mt-5 mb-10 py-5 mx-3 px-3'>
                    <div className='flex border-2 rounded-2xl py-1 px-3'>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6' />
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='text-xl font-medium'>Departure Location</p>
                            <AutoComplete
                                    inputClassName="border-none focus:border-none focus:outline-none px-2 text-center"
                                    value={flightDepLocation}
                                    suggestions={filteredCities}
                                    completeMethod={search}
                                    onChange={(e) => setFlightDepLocation(e.value)} 
                                    panelClassName="bg-white border border-gray-300 shadow-md"
                                    itemTemplate={(item) => (
                                        <div className="p-2 hover:bg-gray-200 focus:bg-gray-200">{item}</div>
                                    )}
                                    placeholder='Leaving From?'
                                    inputProps={{ required: true }}
                                />
                        </div>
                    </div>
                    <div className='flex border-2 rounded-2xl py-1 px-3'>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6' />
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='text-xl font-medium'>Arrival Location</p>
                            <AutoComplete
                                    inputClassName="border-none focus:border-none focus:outline-none px-2 text-center"
                                    value={flightArrLocation} 
                                    suggestions={filteredCities} 
                                    completeMethod={search} 
                                    onChange={(e) => setFlightArrLocation(e.value)} 
                                    panelClassName="bg-white border border-gray-300 shadow-md"
                                    itemTemplate={(item) => (
                                        <div className="p-2 hover:bg-gray-200 focus:bg-gray-200">{item}</div>
                                    )}
                                    placeholder='Going to?'
                                    inputProps={{ required: true }}
                                />
                        </div>
                    </div>
                    {!twoWay ? (
                        <div className='flex border-2 rounded-2xl p-1 px-3'>
                            <div>
                                <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'>Dates</p>
                                <input type="date" placeholder='Flight day' value={flightDepdates} onChange={(e) => setFlightDepdates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='flex border-2 rounded-2xl p-1 px-3'>
                                <div>
                                    <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                                </div>
                                <div className='flex flex-col text-center'>
                                    <p className='text-xl font-medium'>Departure Date</p>
                                    <input type="date" placeholder='Flight day' value={flightDepdates} onChange={(e) => setFlightDepdates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                </div>
                            </div>
                            <div className='flex border-2 rounded-2xl p-1 px-3'>
                                <div>
                                    <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                                </div>
                                <div className='flex flex-col text-center'>
                                    <p className='text-xl font-medium'>Return Date</p>
                                    <input type="date" placeholder='Flight day' value={flightArrDates} onChange={(e) => setFlightArrDates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                </div>
                            </div>
                        </>
                    )}
                    <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium' onClick={handleSubmitFlight}>Search</button>
                </div>
            );
        case 'rides':
            return  <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <div className='flex border-2 rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'>Departure Location</p>
                                <AutoComplete
                                    inputClassName="border-none focus:border-none focus:outline-none px-2 text-center"
                                    value={rideDepLocation} 
                                    suggestions={filteredCities} 
                                    completeMethod={search} 
                                    onChange={(e) => setRideDepLocation(e.value)} 
                                    panelClassName="bg-white border border-gray-300 shadow-md"
                                    itemTemplate={(item) => (
                                        <div className="p-2 hover:bg-gray-200 focus:bg-gray-200">{item}</div>
                                    )}
                                    placeholder='Leaving From?'
                                    inputProps={{ required: true }}
                                />
                            </div>
                        </div>

                        <div className='flex border-2 rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'>Arrival Location</p>
                                <AutoComplete 
                                    className="w-full border-0 focus:border-transparent focus:ring-0" 
                                    inputClassName="border-none focus:border-none focus:outline-none px-2 text-center"
                                    value={rideArrLocation} 
                                    suggestions={filteredCities} 
                                    completeMethod={search} 
                                    onChange={(e) => setRideArrLocation(e.value)} 
                                    panelClassName="bg-white border border-gray-300 shadow-md"
                                    itemTemplate={(item) => (
                                        <div className="p-2 hover:bg-gray-200 focus:bg-gray-200">{item}</div>
                                    )}
                                    placeholder='Where to?'
                                />
                            </div>
                        </div>

                        <div className='flex border-2 rounded-2xl p-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faUser} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Travllers </p>
                                <input type="number" placeholder='Number of Travellers' value={Ridetravllers} onChange={(e) => setRideTravllers(e.target.value)} className='border-none focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium' onClick={handleSubmitRide}> Search </button>
                    </div>;
        case 'packages':
            return <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
        case 'events':
            return <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
        default:
            return <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
    }
}

const filterSection = () =>{
    switch (filterState){
        case '' : return <></>
        case 'stays': return <StayFilterSection stayResponse={stayResponse} stayLoading={stayLoading} stayError={stayError} setStayResponse={setStayResponse}/>
        case 'flight': return <FlightFillter flightResponse={flightResponse} flightLoading={flightLoading} flightError={flightError}/>
        case 'stay': return <RideFilter rideResponse={rideResponse} rideLoading={rideLoading} rideError={rideError}></RideFilter>
        default: <></>
    }
        
}

return (
    <div className='w-full flex flex-col mx-52 bg-white'>
        <div className='w-full my-10 border-2 flex flex-col items-center justify-center rounded-3xl bg-white shadow-lg'>
            <div className=' border-b-2 w-full mb-3 flex justify-center items-center'>
                <ul className='w-full flex justify-center space-x-10 text-lg'>
                    <button className= {`${setcolor('stays')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => {setSection ('stays');}}> Stays</button>
                    <button className= {`${setcolor('flights')} p-3 hover:border-b-black hover:border-b-2`} onClick={() =>{ setSection ('flights'); }}> Flights</button>
                    <button className= {`${setcolor('rides')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('rides')}> Rides</button>
                    <button className= {`${setcolor('packages')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('packages')}> Packages</button>
                    <button className= {`${setcolor('events')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('events')}> Events</button>
                </ul>
            </div>
            {renderSection()}
            {section ==='flights'?
                <div className='flex w-full justify-start pb-6 pl-10 space-x-4 text-lg items-center'>
                    <input type='checkbox' className="h-5 w-5 border-gray-300" checked={twoWay} onChange={handleTwoWay} />
                    <p>Two way</p>
                </div>: <></>}
        </div>
        <div className='bg-white w-full mb-10 '> {filterSection()}</div>
    </div>    
  )
}

export default SearchAndFilter
