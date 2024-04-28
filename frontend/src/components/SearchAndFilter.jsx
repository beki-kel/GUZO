import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot,faCalendar,faUser } from '@fortawesome/free-solid-svg-icons';


function SearchAndFilter({isLoggedIn}) {
    const [section, setSection] = useState('stays');
    const [twoWay, setTwoWay] = useState(false)
    const [stayLocation, setStaylocation] = useState('');
    const [flightDepLocation, setFlightDepLocation] = useState('');
    const [flightArrLocation, setFlightArrLocation] = useState('');
    const [rideDepLocation, setRideDepLocation] = useState('');
    const [rideArrLocation, setRideArrLocation] = useState('');
    const [dates, setdates] = useState('');
    const [travllers, settravllers] = useState('');

    const setcolor = (curr) => section === curr ? 'text-orange-600 border-b-2 border-orange-600' : 'text-black'

    const handleTwoWay = (e) => setTwoWay(e.target.checked)
    
    const renderSection = () => {
    switch (section){
        case 'stays':
            return <div className='w-full flex space-x-10 justify-center items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <div className='flex border-[1px] border-black rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Location</p>
                                <input type="text" placeholder='Where?' value={stayLocation} onChange={(e) => setStaylocation(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>

                        <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Dates </p>
                                <input type="text" placeholder='Start date -End date' value={dates} onChange={(e) => setdates(e.target.value) } className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>

                        <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faUser} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Travllers </p>
                                <input type="text" placeholder='Travellers, Rooms' value={travllers} onChange={(e) => settravllers(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>
                        
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
                    case 'flights':
                        return (
                            <div className='w-full flex space-x-10 justify-center items-center mt-5 mb-10 py-5 mx-3 px-3'>
                                <div className='flex border-[1px] border-black rounded-2xl py-1 px-3'>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6' />
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <p className='text-xl font-medium'>Departure Location</p>
                                        <input type="text" placeholder='Leaving from ?' value={flightDepLocation} onChange={(e) => setFlightDepLocation(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                    </div>
                                </div>
                                <div className='flex border-[1px] border-black rounded-2xl py-1 px-3'>
                                    <div>
                                        <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6' />
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <p className='text-xl font-medium'>Arrival Location</p>
                                        <input type="text" placeholder='Going to ?' value={flightArrLocation} onChange={(e) => setFlightArrLocation(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                    </div>
                                </div>
                                {!twoWay ? (
                                    <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                                        <div>
                                            <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                                        </div>
                                        <div className='flex flex-col text-center'>
                                            <p className='text-xl font-medium'>Dates</p>
                                            <input type="text" placeholder='Flight day' value={dates} onChange={(e) => setdates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                                            <div>
                                                <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                                            </div>
                                            <div className='flex flex-col text-center'>
                                                <p className='text-xl font-medium'>Departure Date</p>
                                                <input type="text" placeholder='Flight day' value={dates} onChange={(e) => setdates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                            </div>
                                        </div>
                                        <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                                            <div>
                                                <FontAwesomeIcon icon={faCalendar} className='text-orange-600 mr-2 mt-3 h-6' />
                                            </div>
                                            <div className='flex flex-col text-center'>
                                                <p className='text-xl font-medium'>Return Date</p>
                                                <input type="text" placeholder='Return day' value={dates} onChange={(e) => setdates(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center' />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'>Search</button>
                            </div>
                        );
        case 'rides':
            return  <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <div className='flex border-[1px] border-black rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'>Departure Location</p>
                                <input type="text" placeholder='Leaving from?' value={rideDepLocation} onChange={(e) => setRideDepLocation(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>

                        <div className='flex border-[1px] border-black rounded-2xl py-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faLocationDot} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'>Arrival Location</p>
                                <input type="text" placeholder='Going to?' value={rideArrLocation} onChange={(e) => setRideArrLocation(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>

                        <div className='flex border-[1px] border-black rounded-2xl p-1 px-3'>
                            <div className=''>
                                <FontAwesomeIcon icon={faUser} className='text-orange-600 mr-2 mt-3 h-6'/> 
                            </div>
                            <div className='flex flex-col text-center'>
                                <p className='text-xl font-medium'> Travllers </p>
                                <input type="text" placeholder='Number of Travellers' value={travllers} onChange={(e) => settravllers(e.target.value)} className='border-nonef focus:border-none focus:outline-none px-2 text-center'/> 
                            </div>
                        </div>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
        case 'packages':
            return <div className='w-full flex space-x-10 justify-center  items-center mt-5 mb-10 py-5 mx-3 px-3'>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <input type="password" placeholder="Password" className='border-black border-2 focus:border-none focus:outline-orange-600 rounded-xl text-center py-2 px-6'/>
                        <button className='bg-orange-500 py-3 px-5 rounded-3xl text-white text-md font-medium'> Search </button>
                    </div>;
        case 'dinning':
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

  return (
    <div className='w-full mx-52 my-10 border-2 flex flex-col items-center justify-center rounded-xl'>
        <div className=' border-b-2 w-full mb-3 flex justify-center items-center'>
            <ul className='w-full flex justify-center space-x-10 text-lg'>
                <button className= {`${setcolor('stays')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('stays') }> Stays</button>
                <button className= {`${setcolor('flights')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('flights')}> Flights</button>
                <button className= {`${setcolor('rides')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('rides')}> Rides</button>
                <button className= {`${setcolor('packages')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('packages')}> Packages</button>
                <button className= {`${setcolor('dinning')} p-3 hover:border-b-black hover:border-b-2`} onClick={() => setSection ('dinning')}> Dinning</button>
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
  )
}

export default SearchAndFilter
