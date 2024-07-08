import React, { useState, useEffect } from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import sheraton from '../assets/Sheraton_Hotel,_Addis_Ababa_(2058298419).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

function StayFilterSection({ stayResponse, stayLoading, stayError, setStayResponse }) {
    const [nocities, setnoCities] = useState('some');
    const [amen, setAmen] = useState('some');
    const [selectedFilters, setSelectedFilters] = useState({
        stayLocation: '',
        amenities: [],
        accommodation: '',
        roomType: '',
        rating:0
    });

    // Function to update stayResponse based on filters
    useEffect(() => {
        const fetchFilteredResults = async () => {
            try {
                // Filter out empty or null values from selectedFilters
                const filteredFilters = Object.fromEntries(
                    Object.entries(selectedFilters).filter(([key, value]) => {
                        if (key === 'amenities') {
                            return value.length > 0; // Include amenities if not empty array
                        } else if (key === 'rating') {
                            return value !== 0; // Include rating if not zero
                        }
                        return value !== '' && value !== null; // Include other filters if not empty or null
                    })
                );
    
                const response = await fetch('http://localhost:5000/search/filter/Accomadation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filteredFilters),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch filtered results');
                }
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log('No results found');
                    setStayResponse([]);
                } else {
                    console.log('Filtered results:', data);
                    setStayResponse(data);
                }
            } catch (error) {
                console.error('Error fetching filtered results:', error);
                // Handle error state
            }
        };
    
        fetchFilteredResults();
    }, [selectedFilters, setStayResponse]);

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => {
            if (type === 'stayLocation' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
                return { ...prevFilters, [type]: value };
            }
            if (type === 'amenities') {
                const newAmenities = prevFilters.amenities.includes(value)
                    ? prevFilters.amenities.filter((item) => item !== value)
                    : [...prevFilters.amenities, value];
                return { ...prevFilters, amenities: newAmenities };
            }
            return prevFilters;
        });
    };

    const handleRemoveFilter = (type, value) => {
        setSelectedFilters((prevFilters) => {
            if (type === 'stayLocation' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
                return { ...prevFilters, [type]: '' };
            }
            if (type === 'amenities') {
                return { ...prevFilters, amenities: prevFilters.amenities.filter((item) => item !== value) };
            }
            return prevFilters;
        });
    };

    return (
        <div className='w-full my-10 flex flex-col'>
            {stayLoading && (
                <div className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            {stayError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'> {stayError} </div>
            )}

            {stayResponse && (
                <div className='w-full flex space-x-10 justify-center'>
                    <div className='w-3/12 flex flex-col items-start justify-start text-center px-10 border-r-2 border-orange-500'>
                        <p className='text-2xl text-center m-2 mb-0 font-medium'> Filter By </p>
                        <p className='text-md mt-3 mx-2 font-medium text-center text-orange-500'>Cities </p>
                        {nocities === 'some' ? (
                            <form className='flex flex-col space-y-2 border-orange-500 text-start justify-start items-start opacity-100'>
                                {['Addis Ababa', 'Hawassa', 'Jijiga', 'Semera'].map(city => (
                                    <div className='flex justify-center' key={city}>
                                        <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('stayLocation', city)} checked={selectedFilters.stayLocation === city} />
                                        <label htmlFor={city}>{city}</label>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                    onClick={() => setnoCities('full')}
                                >
                                    See More
                                </button>
                            </form>
                        ) : (
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {[
                                    'Addis Ababa', 'Hawassa', 'Jijiga', 'Semera', 'Adama', 'Arba Minch', 'Assosa', 'Axum', 'Bahir Dar', 'Bale Robe',
                                    'Dembidollo', 'Dire Dawa', 'Gambella', 'Gode', 'Gondar', 'Humera', 'Jimma', 'Jinka', 'Kabri Dar', 'Kombolcha',
                                    'Lablibela', 'Mekelle'
                                ].map(city => (
                                    <div className='flex justify-center' key={city}>
                                        <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('stayLocation', city)} checked={selectedFilters.stayLocation === city} />
                                        <label htmlFor={city}>{city}</label>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                    onClick={() => setnoCities('some')}
                                >
                                    See less
                                </button>
                            </form>
                        )}

                        <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Amenities </p>
                        {amen === 'some' ? (
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Free Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service'].map(amenity => (
                                    <div className='flex justify-center' key={amenity}>
                                        <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('amenities', amenity)} checked={selectedFilters.amenities.includes(amenity)} />
                                        <label htmlFor={amenity}>{amenity}</label>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                    onClick={() => setAmen('full')}
                                >
                                    See More
                                </button>
                            </form>
                        ) : (
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Free Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Tea/Coffee Maker', 'Seating Area', 'Soundproof Rooms', 'Non-smoking Rooms', 'Balcony', 'View', 'Telephone'].map(amenity => (
                                    <div className='flex justify-center' key={amenity}>
                                        <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('amenities', amenity)} checked={selectedFilters.amenities.includes(amenity)} />
                                        <label htmlFor={amenity}>{amenity}</label>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                    onClick={() => setAmen('some')}
                                >
                                    See less
                                </button>
                            </form>
                        )}

                        <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Accommodation Type</p>
                        <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                            {['Hotel', 'Resort', 'Guest House'].map(Accom => (
                                <div className='flex justify-center' key={Accom}>
                                    <input type="radio" name="accommodation" value={Accom} id={Accom} className="accent-orange-600 mr-1"
                                        onChange={() => handleFilterChange('accommodation', Accom)} checked={selectedFilters.accommodation === Accom} />
                                    <label htmlFor={Accom}>{Accom}</label>
                                </div>
                            ))}
                        </form>

                        <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Type </p>
                        <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                            {['Single', 'Double', 'Triple', 'Quad', 'other'].map(room => (
                                <div className='flex justify-center' key={room}>
                                    <input type="radio" name="roomType" value={room} id={room} className="accent-orange-600 mr-1"
                                        onChange={() => handleFilterChange('roomType', room)} checked={selectedFilters.roomType === room} />
                                    <label htmlFor={room}>{room}</label>
                                </div>
                            ))}
                        </form>

                        <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Rating </p>
                        <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                            {[1, 2, 3, 4, 5].map(rating => (
                                <div className='flex justify-center' key={rating}>
                                    <input type="radio" name="rating" value={rating} id={`rating-${rating}`} className="accent-orange-600 mr-1"
                                        onChange={() => handleFilterChange('rating', rating)} checked={selectedFilters.rating === rating} />
                                    <label htmlFor={`rating-${rating}`} className='flex items-center'>
                                        {Array(rating).fill().map((_, i) => (
                                            <FontAwesomeIcon icon={faStar} className='mr-1 text-orange-500' key={i} />
                                        ))}
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>

                    <div className='w-7/12 flex flex-col bg-white'>
                        <p className='text-2xl text-center m-2 mb-4'> Found {stayResponse.length === 1 ? "1 Result" : `${stayResponse.length} Results`} </p>
                        <div className='w-full mb-3 rounded-md flex flex-wrap'>
                            {Object.entries(selectedFilters).map(([type, value]) => (
                                (type === 'amenities' ? value.map((amenity) => (
                                    <div className='bg-orange-500 text-white rounded-2xl px-3 py-2 flex items-center m-2' key={amenity}>
                                        <p>{amenity}</p>
                                        <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, amenity)} />
                                    </div>
                                )) : (value ?
                                    <div className='bg-orange-500 text-white rounded-2xl px-3 py-2 flex items-center m-2' key={value}>
                                        {value ? <p>{value}</p> : <></>  }
                                        <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, value)} />
                                    </div>:<></>
                                ))
                            ))}
                        </div>

                        {stayResponse.map((stay, index) => (
                            <div className='w-full mr-32  bg-white flex rounded-2xl shadow-md border-2 mb-3' key={index}>
                                <div className='w-5/12 rounded-xl'>
                                    <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                </div>
                                <div className="w-7/12">
                                    <div className='w-full flex items-center justify-center'>
                                        <p className="text-orange-600 text-xl w-full px-3 py-2 pb-0 font-medium">{stay.name}</p>
                                        
                                        <div className="flex items-center pr-3">
                                            {Array(parseInt(stay.rating)).fill().map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} className='text-orange-500' key={i} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='pl-3 text-sm'>{stay.city},{stay.location}</p>
                                    <div className='w-full flex space-x-5 pl-3 py-2'>
                                        {stay.rooms.map((room, index) => (<div className=' text-sm text-orange-500' key={index}> <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> <span className='text-gray-400'>{room.type !== "other"? room.type : room.otherType}</span> </div>))}
                                    </div>
                                    <p className="w-full px-6 text-md "> {stay.description}</p>

                                    <div className=' flex items-center p-3  mt-2'>
                                        <div className='w-1/2'>
                                            <p className=' w-1/3 text-center px-4 py-1 bg-orange-600 rounded-md text-white'>
                                                {stay.userRating}
                                            </p>
                                        </div>

                                        <div className='flex justify-center w-1/2 items-center my-2 '>
                                            <span className='font-semibold text-xl ml-auto'>{Math.min(...stay.rooms.map(room => room.price))}</span>  - <span className='font-medium text-xl mr-1'> {Math.max(...stay.rooms.map(room => room.price))} </span> birr
                                        </div>
                                    </div>
                                </div>
                        
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StayFilterSection;
