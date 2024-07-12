import React from 'react'
import orangeLoading from '../assets/orange-gif.gif';

function EventFilter({eventResponse , eventLoading , eventError}) {
    return (
        <div>
            <div className='w-full my-10 flex flex-col'>
                {eventLoading && (
                    <div className='w-full flex justify-center items-center mb-2 p-2'>
                        <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                    </div>
                )}

                { eventError && (
                    <div className='w-full text-center text-2xl text-red-600 p-9'>{eventError}</div>
                )}

                {eventResponse  && (
                    <p className="text-3xl font-serif w-full text-center text-gray-800  mb-4">Found results for Events</p>
                )}

            </div>
        </div>
    )
}

export default EventFilter
