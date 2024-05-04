import React, { useState } from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import sheraton from '../assets/Sheraton_Hotel,_Addis_Ababa_(2058298419).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faHotel, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

function StayFilterSection({ stayResponse, stayLoading, stayError }) {

    const [nocities, setnoCities] = useState('some');
    const [amen, setAmen] = useState('some');
    const [selectedFilters, setSelectedFilters] = useState({
        cities: '',
        amenities: [],
        accommodation: '',
        roomType: '',
        rating: 0,
    });

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => {
            if (type === 'cities' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
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
            if (type === 'cities' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
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
                    <img src={orangeLoading} alt="Loading" className="w-50 h-32 rounded-t-lg" />
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
                                            onChange={() => handleFilterChange('cities', city)} checked={selectedFilters.cities === city} />
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
                                            onChange={() => handleFilterChange('cities', city)} checked={selectedFilters.cities === city} />
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
                                    <div className='bg-slate-100 rounded-2xl px-3 py-2 flex items-center m-2' key={amenity}>
                                        <p>{amenity}</p>
                                        <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, amenity)} />
                                    </div>
                                )) : (value ?
                                    <div className='bg-slate-100 rounded-2xl px-3 py-2 flex items-center m-2' key={value}>
                                        {value ? <p>{value}</p> : <></>  }
                                        <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, value)} />
                                    </div>:<></>
                                ))
                            ))}
                        </div>

                        {stayResponse.map((stay, index) => (
                            <div className='w-full mr-32  bg-white flex rounded-2xl border-2 mb-3' key={index}>
                                <div className='w-5/12 rounded-xl'>
                                    <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                </div>
                                <div className=' h-60'>
                                    <div className='w-full flex items-center justify-center'>
                                        <p className="text-orange-600 text-xl w-full px-3 py-2 pb-0 font-medium">{stay.name}</p>
                                        
                                        <div className="flex items-center pr-3">
                                            {Array(parseInt(stay.rating)).fill().map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} className='text-orange-500' key={i} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className='ml-3 text-sm'>{stay.city},{stay.location}</p>
                                    <div className='w-full flex space-x-5 ml-3 py-2'>
                                        {stay.rooms.map((room, index) => (<div className=' text-sm text-orange-500' key={index}> <FontAwesomeIcon icon={faBed}></FontAwesomeIcon> <span className='text-gray-400'>{room.type}</span> </div>))}
                                    </div>
                                    <p className="ml-3 text-md text-center"> {stay.description} </p>


                                    <div className='w-full flex items-center p-3  '>
                                        <p className='px-4 py-1 bg-orange-500 rounded-md text-white'>
                                            {stay.userRating}
                                        </p>

                                        <div className='flex justify-center w-full items-center my-2 ml-10 text-orange-500'>
                                        <span className='font-medium text-xl'>{Math.min(...stay.rooms.map(room => room.price))}</span>  - <span className='font-medium text-xl mr-1'> {Math.max(...stay.rooms.map(room => room.price))} </span> birr
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
