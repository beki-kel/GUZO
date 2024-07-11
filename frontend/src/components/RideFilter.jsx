import React from 'react'

function RideFilter({rideResponse,rideLoading,rideError}) {
    return (
        <div className='w-full my-10 flex flex-col'>
            {rideLoading && (
                <div  className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            { rideError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'>{rideError}</div>
            )}
        </div>
    )
    }

export default RideFilter
