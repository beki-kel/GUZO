import React from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import Kebero from '../assets/Kebero.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import HoverCard from "@darenft/react-3d-hover-card";
import "@darenft/react-3d-hover-card/dist/style.css";

function EventFilter({ eventResponse, eventLoading, eventError }) {
    return (
        <div>
            <div className='w-full my-10 flex flex-col'>
                {eventLoading && (
                    <div className='w-full flex justify-center items-center mb-2 p-2'>
                        <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg " />
                    </div>
                )}

                {eventError && (
                    <div className='w-full text-center text-2xl text-red-600 p-9'>{eventError}</div>
                )}

                {eventResponse && (
                    <div className='w-full my-10 flex flex-col'>
                        <p className="text-3xl font-serif w-full text-center text-black">Found results for Events</p>
                        <div className='w-full mb-36 flex flex-wrap items-center justify-center'>
                            {eventResponse.map((event, index) => (
                                <div key={index} className='w-1/4 mx-3 mt-36 flex flex-col justify-center items-center bg-gradient-to-br from-red-400 to-orange-300 rounded-2xl shadow-2xl hover:scale-105 text-white'>
                                    <HoverCard scaleFactor={1}>
                                        <div className='w-full mt-2 text-white px-6 py-3'>
                                            <img src={Kebero} className='w-full h-56 rounded-t-md mb-8 z-30 shadow-xl rounded-lg mt-[-6rem]' alt="Event" />
                                        </div>
                                    </HoverCard>
                                    <p className='mr-auto ml-2 text-lg text-center p-2'>{event.description}</p>
                                    <div className='w-full flex items-center justify-center px-3 py-2'>
                                        <FontAwesomeIcon icon={faLocationDot} className='h-4 ml-2 text-black' />
                                        <p className='mr-auto ml-2 text-lg'>{event.location}</p>
                                        <FontAwesomeIcon icon={faCalendar} className='h-4 ml-2 text-black' />
                                        <p className='mr-auto ml-2 text-lg'>{event.date}</p>
                                    </div>
                                    <div className='w-full p-3 bg-gray-50 text-orange-500 rounded-b-2xl flex items-center justify-center mt-2 font-bold'>
                                        <p className='mr-auto ml-2 text-lg'>{event.title}</p>
                                        <FontAwesomeIcon icon={faStar} className="text-orange-600" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventFilter;
