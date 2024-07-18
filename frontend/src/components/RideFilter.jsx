import React from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import blackCar from '../assets/black-sedan-car-isolated-white-vector.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faClose } from '@fortawesome/free-solid-svg-icons';

const RideFilter = ({ rideResponse, rideLoading, rideError ,setFilterState}) => {
    const handleClick = () => setFilterState('')
    return (
        <div className='w-full my-10 flex flex-col'>
            {rideLoading && (
                <div className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            {rideError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'>{rideError}</div>
            )}

            {rideResponse && (
                                <div className='w-full flex flex-col'>
                                    <div className='w-full p-6 flex justify-end items-end'>
                                        <div className='w-6' onClick={handleClick}>
                                            <FontAwesomeIcon icon={faClose} className='h-6 w-6'>close</FontAwesomeIcon>
                                        </div>
                                    </div>
                                    <p className="text-3xl font-serif w-full text-center text-gray-800  mb-4">Found results for Rides</p>
                                </div>
            )}

            {rideResponse && rideResponse.map((ride) => (
                <div key={ride._id} className='w-[45%] p-3 m-4 rounded-3xl shadow-md shadow-gray-300 hover:scale-110 transform transition duration-700'>
                    <div className='bg-gradient-to-br from-red-500 to-orange-500 py-2 px-3 m-3 rounded-xl shadow-lg shadow-orange-800 z-20 flex flex-col'>
                        <div className='w-full h-7/12 flex items-center justify-center'>
                            <img className='w-1/2 h-7/12 z-30' src={blackCar} alt="Car" />
                            <div className='w-1/2 h-7/12 flex items-center justify-center z-30'>
                                <div className='w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 border-4 border-white shadow-orange-900 shadow-xl'>
                                    <FontAwesomeIcon icon={faUser} className='w-12 h-12 text-black' />
                                </div>
                            </div>
                        </div>
                        
                        <div className='w-full h-5/12 mt-6 flex pb-2'>
                            <div className='w-1/2'>
                                <p className='font-semibold text-white'> Full Name <span className='text-black ml-1 font-mono'>{ride.drivername}</span></p>
                                <p className='font-semibold text-white'> Car Brand <span className='text-black ml-1 font-mono'>{ride.brand}</span></p>
                                <p className='font-semibold text-white'> Car Rating <span className='text-black ml-1 font-mono'>{ride.totalratings}</span></p>
                                <p className='font-semibold text-white'> Plate No <span className='text-black ml-1 font-mono'>{ride.plateNo}</span></p>
                            </div>

                            <div className='w-1/2'>
                                <p className='font-semibold text-white'> Capacity <span className='text-black font-mono'>{ride.capacity}</span></p>
                                <p className='font-semibold text-white'> Driver Rating <span className='text-black font-mono'>{ride.driverrating}</span></p>
                                <p className='font-semibold text-white'> Driver Location <span className='text-black font-mono'>{ride.pickUp}</span></p>
                                <p className='font-semibold text-black'><span className='text-black font-bold text-xl font-mono'>{ride.finalPrice.toFixed(2)} </span>birr</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RideFilter;
