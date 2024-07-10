import React from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import EthiopianAirlines from '../assets/Ethiopian_Airlines12.jpg';

function FlightFilter({ flightResponse, flightLoading, flightError }) {
    const totalResults = (flightResponse?.outboundFlights?.length || 0) + (flightResponse?.returnFlights?.length || 0);
    const fromAirport = flightResponse?.outboundFlights[0]?.departure?.airport || '';
    const toAirport = flightResponse?.outboundFlights[0]?.arrival?.airport || '';

    return (
        <div className='w-full my-10 flex flex-col'>
            {flightLoading && (
                <div className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            {flightError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'>{flightError}</div>
            )}

            {flightResponse && (
                <div className='w-full flex flex-col space-y-6 justify-center items-center px-24'>
                    <p className='py-5 text-3xl font-serif'>
                        Found flights from {fromAirport} to {toAirport}
                    </p>

                    {flightResponse.outboundFlights && flightResponse.outboundFlights.length > 0 && (
                        flightResponse.outboundFlights.map((flight, index) => (
                            <div key={flight._id} className='w-full flex flex-col space-y-6'>
                                <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out'>
                                    <div className='w-1/2 py-6 h-40 bg-gradient-to-r from-orange-500 to-orange-300 rounded-md mr-2 flex items-center justify-center'>
                                        <div className='text-center'>
                                            <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                            <p className='text-xl font-semibold text-white'>{flight.airline}</p>
                                            <p className='text-sm text-white'>Flight Number: {flight.flightNumber}</p>
                                            <p className='text-sm text-white'>Date: {flight.flightDate}</p>
                                        </div>
                                    </div>

                                    <div className='w-1/2 py-6 h-40 bg-gray-100 rounded-md ml-2 flex items-center justify-center'>
                                        <div className='text-center'>
                                            <p className='text-sm'>From: {flight.departure.airport}</p>
                                            <p className='text-sm'>To: {flight.arrival.airport}</p>
                                            <p className='text-sm'>Price: ${flight.price}</p>
                                        </div>
                                    </div>
                                </div>

                                {flightResponse.returnFlights && flightResponse.returnFlights[index] && (
                                    <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out'>
                                        <div className='w-1/2 py-6 h-40 bg-gradient-to-r from-orange-500 to-orange-300 rounded-md mr-2 flex items-center justify-center'>
                                            <div className='text-center'>
                                                <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                <p className='text-xl font-semibold text-white'>{flight.airline}</p>
                                                <p className='text-sm text-white'>Flight Number: {flight.flightNumber}</p>
                                                <p className='text-sm text-white'>Date: {flight.flightDate}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white p-3 left-auto top-auto absolute z-20 mt-14 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out'>
                                            <FontAwesomeIcon icon={faRightLeft} className='text-orange-500 w-full h-10 z-10' />
                                        </div>

                                        <div className='w-1/2 py-6 h-40 bg-gradient-to-r from-orange-400 to-orange-200 rounded-md ml-2 flex items-center justify-center'>
                                            <div className='text-center'>
                                                <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                <p className='text-xl font-semibold text-white'>{flightResponse.returnFlights[index].airline}</p>
                                                <p className='text-sm text-white'>Flight Number: {flightResponse.returnFlights[index].flightNumber}</p>
                                                <p className='text-sm text-white'>Date: {flightResponse.returnFlights[index].flightDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {flightResponse.returnFlights && flightResponse.returnFlights.length > 0 && flightResponse.outboundFlights.length === 0 && (
                        flightResponse.returnFlights.map((returnFlight) => (
                            <div key={returnFlight._id} className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out'>
                                <div className='w-1/2 py-6 h-40 bg-gradient-to-r from-orange-400 to-orange-200 rounded-md mr-2 flex items-center justify-center'>
                                    <div className='text-center'>
                                        <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                        <p className='text-xl font-semibold text-white'>{returnFlight.airline}</p>
                                        <p className='text-sm text-white'>Flight Number: {returnFlight.flightNumber}</p>
                                        <p className='text-sm text-white'>Date: {returnFlight.flightDate}</p>
                                    </div>
                                </div>
                                <div className='w-1/2 py-6 h-40 bg-gray-100 rounded-md ml-2 flex items-center justify-center'>
                                    <div className='text-center'>
                                        <p className='text-sm'>From: {returnFlight.departure.airport}</p>
                                        <p className='text-sm'>To: {returnFlight.arrival.airport}</p>
                                        <p className='text-sm'>Price: ${returnFlight.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default FlightFilter;
