import React from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faRightLeft } from '@fortawesome/free-solid-svg-icons';

function FlightFillter({flightResponse,flightLoading,flightError}) {
    return (
        <div className='w-full my-10 flex flex-col'>
            {flightLoading && (
                <div className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            {flightError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'> {flightError} </div>
            )}

            {flightResponse && (
                <div className='w-full flex flex-col space-y-6 justify-center items-center px-24 '>
                    <div className='w-full flex  justify-center p-5 py-8 shadow-sm border-2 rounded-xl'> 
                        <div className='w-1/2 py-6 h-40 bg-gray-50 rounded-md  mr-2'>

                        </div>
                        <div className='flex items-center justify-center  w-12 h-12 rounded-full bg-white  p-3 left-auto top-auto absolute z-20 mt-14 shadow-lg'>
                            <FontAwesomeIcon icon={faRightLeft} className='text-orange-500 w-full h-10 z-10 '/>
                        </div>
                        
                        <div className='w-1/2 py-6 h-40 bg-gray-100 rounded-md  ml-2'>

                        </div>
                    </div>

                    <div className='w-full flex  justify-center p-5 py-8 shadow-sm border-2 rounded-xl'> 
                        <div className='w-1/2 py-6 h-40 bg-gray-50 rounded-md  mr-2'>

                        </div>
                        <div className='flex items-center justify-center  w-12 h-12 rounded-full bg-white  p-3 left-auto top-auto absolute z-20 mt-14 shadow-lg'>
                            <FontAwesomeIcon icon={faRightLeft} className='text-orange-500 w-full h-10 z-10 '/>
                        </div>
                        
                        <div className='w-1/2 py-6 h-40 bg-gray-100 rounded-md  ml-2'>

                        </div>
                    </div>

                    <div className='w-full flex  justify-center p-5 py-8 shadow-sm border-2 rounded-xl'> 
                        <div className='w-1/2 py-6 h-40 bg-gray-50 rounded-md  mr-2'>

                        </div>
                        <div className='flex items-center justify-center  w-12 h-12 rounded-full bg-white  p-3 left-auto top-auto absolute z-20 mt-14 shadow-lg'>
                            <FontAwesomeIcon icon={faRightLeft} className='text-orange-500 w-full h-10 z-10 '/>
                        </div>
                        
                        <div className='w-1/2 py-6 h-40 bg-gray-100 rounded-md  ml-2'>

                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default FlightFillter
