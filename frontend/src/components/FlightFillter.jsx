import React from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlane, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import EthiopianAirlines from '../assets/Ethiopian_Airlines12.jpg';
import QRCode from "react-qr-code";

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
                        flightResponse.outboundFlights.map((flight, index) => {
                            const qrValueOutbound = `Outbound City: ${flight.departure.airport}\nReturn City: ${flight.arrival.airport}\nFlight Number: ${flight.flightNumber}\nFlight Date: ${flight.flightDate}`;
                            const returnFlight = flightResponse.returnFlights ? flightResponse.returnFlights[index] : null;
                            const qrValueReturn = returnFlight ? `Outbound City: ${returnFlight.departure.airport}\nReturn City: ${returnFlight.arrival.airport}\nFlight Number: ${returnFlight.flightNumber}\nFlight Date: ${returnFlight.flightDate}` : '';
                            const qrValue = qrValueOutbound + (returnFlight ? `\n\nReturn Flight:\n${qrValueReturn}` : '');
                            const totalPrice = returnFlight ? flight.price + returnFlight.price : flight.price;

                            return (
                                <div key={flight._id} className='w-full flex flex-col space-y-6'>
                                    <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out'>
                                        <div className='w-1/2 py-6 h-64 bg-gradient-to-r from-orange-700 to-orange-500 rounded-md mr-2 flex items-center justify-center'>
                                            <div className='text-center'>
                                                <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                <p className='text-xl font-semibold text-white'>{flight.airline}</p>
                                                <p className='text-sm text-white'>Flight Number: {flight.flightNumber}</p>
                                                <p className='text-sm text-white'>Date: {flight.flightDate}</p>
                                            </div>
                                        </div>

                                        <div className='w-1/2 h-64 bg-gray-100 rounded-md ml-2 flex items-center justify-center'>
                                            <div className='w-1/2 pl-3 flex flex-col'>
                                                <p className='text-lg flex flex-col '>
                                                    <span><FontAwesomeIcon icon={faPlane} /> {flight.departure.airport} </span>
                                                    <span className='h-10 border-l-2 border-dashed border-orange-700 ml-6 text-xs p-2 flex items-center text-gray-400'> <FontAwesomeIcon icon={faCalendar} className='text-gray-500 mr-1' /> {flight.flightDate}</span>
                                                    <span ><FontAwesomeIcon icon={faPlane} /> {flight.arrival.airport}</span></p>
                                                <p className='text-xl font-thin mt-14'>Price: <span className='text-red-400 font-bold'>${flight.price} </span></p>
                                            </div>
                                            <div className='w-1/2 h-full border-white border-l-2 border-dashed p-6 flex items-center justify-center'>
                                                <QRCode
                                                    size={128}
                                                    value={qrValueOutbound}
                                                    viewBox={`0 0 256 256`}
                                                    fgColor='#e87431'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {returnFlight && (
                                        <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out'>
                                            <div className='w-1/2 py-6 h-64 bg-orange-700 to-orange-400 rounded-md mr-2 flex items-center justify-center'>
                                                <div className='text-center'>
                                                    <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                    <p className='text-xl font-semibold text-white'>{returnFlight.airline}</p>
                                                    <p className='text-sm text-white'>Flight Number: {returnFlight.flightNumber}</p>
                                                    <p className='text-sm text-white'>Date: {returnFlight.flightDate}</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white p-3 left-auto top-auto absolute z-20 mt-28 mr-72 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out'>
                                                <FontAwesomeIcon icon={faRightLeft} className='text-orange-700 w-full h-10 z-10' />
                                            </div>

                                            <div className='w-1/2 py-6 h-64 bg-orange-600 to-orange-300 rounded-md ml-2 flex items-center justify-center'>
                                                <div className='text-center'>
                                                    <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                    <p className='text-xl font-semibold text-white'>{returnFlight.airline}</p>
                                                    <p className='text-sm text-white'>Flight Number: {returnFlight.flightNumber}</p>
                                                    <p className='text-sm text-white'>Date: {returnFlight.flightDate}</p>
                                                </div>
                                            </div>

                                            <div className='w-1/2 h-64 bg-gray-100 rounded-md ml-2 flex flex-col items-start'>
                                                <div className='w-full h-32 flex px-1 items-start justify-center'>
                                                    <div className='w-1/2 flex flex-col border-r-4 border-b-4 border-dashed border-white items-center pt-4'>
                                                        <p className='text-lg flex flex-col '>
                                                            <span><FontAwesomeIcon icon={faPlane} /> {flight.departure.airport} </span>
                                                            <span className='h-10 border-l-2 border-dashed border-orange-900 ml-8 text-xs p-2 flex items-center text-gray-400'> <FontAwesomeIcon icon={faCalendar} className='text-gray-500 mr-1' /> {flight.flightDate}</span>
                                                            <span ><FontAwesomeIcon icon={faPlane} /> {flight.arrival.airport}</span></p>
                                                    </div>
                                                    <div className='w-1/2 px-1 flex flex-col border-b-4 border-dashed border-white  items-center pt-4'>
                                                        <p className='text-lg flex flex-col '>
                                                            <span><FontAwesomeIcon icon={faPlane} /> {returnFlight.departure.airport} </span>
                                                            <span className='h-10 border-l-2 border-dashed border-orange-900 ml-8 text-xs p-2 flex items-center text-gray-400'> <FontAwesomeIcon icon={faCalendar} className='text-gray-500 mr-1' /> {returnFlight.flightDate}</span>
                                                            <span ><FontAwesomeIcon icon={faPlane} /> {returnFlight.arrival.airport}</span></p>
                                                    </div>
                                                </div>
                                                <div className='h-32 w-full flex'>
                                                    <div className='w-1/2 h-full flex items-center justify-center'>
                                                        <p className='text-xl w-full h-full font-thin mt-14 text-center'>Total  Price <span className='text-red-400 font-bold block'>${totalPrice}</span></p>
                                                    </div>
                                                    <div className='w-1/2 h-full flex items-center justify-center'>
                                                        <QRCode
                                                            size={88}
                                                            value={qrValue}
                                                            viewBox={`0 0 256 256`}
                                                            fgColor='#e87431'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

export default FlightFilter;
