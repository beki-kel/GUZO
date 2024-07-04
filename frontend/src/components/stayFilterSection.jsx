import React,{useState} from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import sheraton from '../assets/Sheraton_Hotel,_Addis_Ababa_(2058298419).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';


function StayFilterSection( {stayResponse,stayLoading,stayError}) {

    const [nocities, setnoCities] = useState('some');
    const [amen, setAmen] = useState('some')
    return (
        <div className='w-full my-10 flex flex-col'>
            {stayLoading ? <div className='w-full flex justify-center items-center mb-2 p-2'>
                <img src={orangeLoading} alt="Loading" className=" w-50 h-32 rounded-t-lg" />
            </div>:<></>}

            {stayError ? <div className='w-full text-center text-2xl text-red-600 p-9'> {stayError} </div> :<></> }

            {stayResponse?<div  className='w-full flex space-x-10 justify-center'>
                            <div className='w-3/12 flex flex-col items-center justify-start text-center  px-10 border-r-2 border-orange-500'>
                                <p className='text-2xl text-center m-2 mb-0 font-medium'> Filter By </p>
                                <p className='text-md mt-3 mx-2 font-medium text-center text-orange-500'>Cities </p>
                                    { nocities==='some'? (<form className='flex flex-col space-y-2 border-orange-500 text-start justify-start items-start opacity-100'>
                                {['Addis Ababa', 'Hawassa', 'Jijiga', 'Semera'].map(city => (
                                    <div className='flex justify-center' key={city}>
                                        <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1" />
                                        <label htmlFor={city}>{city}</label>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center '
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
                                        <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1" />
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
                            </form>)}

                                    <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Amenities </p>
                                    {amen === 'some'? <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Free Wi-Fi','Air Conditioning','TV','Mini Bar','Room Service'].map(amenity => (
                                    <div className='flex justify-center' key={amenity}>
                                        <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1" />
                                        <label htmlFor={amenity}>{amenity}</label>
                                    </div>
                                ))}                                                               
                                <button type="button" className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center' onClick={() => setAmen('full')}>
                                    See More
                                </button>
                            </form> : <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                        { ['Free Wi-Fi','Air Conditioning','TV','Mini Bar','Room Service','Tea/Coffee Maker','Seating Area','Soundproof Rooms','Non-smoking Rooms','Balcony','View','Telephone',].map(amenity => (
                                            <div className='flex justify-center' key={amenity}>
                                                <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1" />
                                                <label htmlFor={amenity}>{amenity}</label>
                                            </div>
                                        ))}                                                               
                                        <button type="button" className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center' onClick={() => setAmen('some')}>
                                            See less
                                        </button>
                                    </form> 
                            }


                                <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Accommodation Type</p>
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Hotel','Resort','Guest House'].map(Accom => (
                                    <div className='flex justify-center' key={Accom}>
                                        <input type="radio" name="amenities" value={Accom} id={Accom} className="accent-orange-600 mr-1" />
                                        <label htmlFor={Accom}>{Accom}</label>
                                    </div>
                                ))}
                                </form>
                                
                                <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Type </p>
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Single','Double','Triple','Quad','other'].map(room => (
                                    <div className='flex justify-center' key={room}>
                                        <input type="radio" name="amenities" value={room} id={room} className="accent-orange-600 mr-1" />
                                        <label htmlFor={room}>{room}</label>
                                    </div>
                                ))}
                                </form>

                                
                                <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Rating </p>
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <div className='flex justify-center' key={rating}>
                                            <input type="radio" name="rating" value={rating} id={`rating-${rating}`} className="accent-orange-600 mr-1" />
                                            <label htmlFor={`rating-${rating}`} className='flex items-center'>
                                                {Array(rating).fill().map((_, i) => (
                                                    <FontAwesomeIcon icon={faStar} className=' mr-1 text-orange-500' key={i} />
                                                ))}
                                            </label>
                                        </div>
                                    ))}
                                </form>
                            </div>

                            <div className='w-7/12 flex flex-col bg-white'>
                            <p className='text-2xl text-center m-2 mb-0 font-medium'> </p>
                                <div className='w-full mr-32 bg-white flex rounded-2xl border-2 mb-3'>
                                    <div className='w-5/12 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl " />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white flex rounded-2xl border-2 mb-3'>
                                    <div className='w-5/12 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white flex rounded-2xl border-2 mb-3'>
                                    <div className='w-5/12 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white flex rounded-2xl border-2 mb-3'>
                                    <div className='w-5/12 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white flex rounded-2xl border-2 mb-3'>
                                    <div className='w-5/12 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-60 w-full rounded-l-2xl" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>
                            </div>
                        </div>
            :<></>}
        </div>
  )
}

export default StayFilterSection
