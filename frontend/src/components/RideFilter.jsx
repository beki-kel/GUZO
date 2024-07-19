import React, { useState } from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import blackCar from '../assets/black-sedan-car-isolated-white-vector.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClose } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Button, Alert } from "@material-tailwind/react";

const RideFilter = ({ rideResponse, rideLoading, rideError, setFilterState }) => {
    const handleClick = () => setFilterState('');
    const [car, setCar] = useState('');
    const [pick, setPick] = useState('');
    const [drop, setDrop] = useState('');
    const [finalPrice, setFinalPrice] = useState('');
    const [open, setOpen] = useState(false);
    const [altopen, setAltOpen] = useState(false);
    const [isAlerted, setIsAlerted] = useState(false);
    const [err, setErr] = useState(false);

    const handleBooking = async () => {
        const userID = localStorage.getItem('_id');
    
        const reqBody = {
            userId: userID,
            type: "transportation",
            details: {
                carId: car,
                pickupLocation: pick,
                dropoffLocation: drop,
                finalPrice: finalPrice,
            }
        };
    
        setAltOpen(false);
        setIsAlerted(false);
        setErr(false);
    
        try {
            const response = await fetch("http://localhost:5000/add/book", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
    
            if (response.status === 201) {
                const data = await response.json();
                console.log("Booking Successful", data);
                setIsAlerted(true);
            } else {
                console.log('Failed to book the ride');
                setErr(true);
            }
        } catch (error) {
            console.error('Error booking the ride:', error);
            setErr(true);
        }
    };
    

    const handleAltOpen = (rideId, ridePick, rideDrop, ridePrice) => {
        setCar(rideId);
        setPick(ridePick);
        setDrop(rideDrop);
        setFinalPrice(ridePrice);
        setAltOpen(!altopen);
        setIsAlerted(false);
        setErr(false);
    };

    const handleOpen = () => {
        setOpen(!open)
        setIsAlerted(false);
        setErr(false);
    };

    const handleClose = () => {
        setAltOpen(false);
        setIsAlerted(false);
        setErr(false);
    };

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
                    <p className="text-3xl font-serif w-full text-center text-gray-800 mb-4">Found results for Rides</p>
                </div>
            )}

            {rideResponse && rideResponse.map((ride) => (
                <div key={ride._id} className='w-[45%] p-3 m-4 rounded-3xl shadow-md shadow-gray-300 hover:scale-110 transform transition duration-700' >
                    <div className='bg-gradient-to-br from-red-500 to-orange-500 py-2 px-3 m-3 rounded-xl shadow-lg shadow-orange-800 z-20 flex flex-col' onClick={ handleOpen}>
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

                    <Dialog size="xl" open={open} handler={() => handleOpen}>

                        <DialogHeader className="justify-between flex-col">
                            <div className="w-full flex items-end justify-end">
                                <Button size="sm" onClick={handleOpen} className='bg-orange-700'>
                                    <FontAwesomeIcon icon={faClose} />
                                </Button>
                            </div>

                            {isAlerted &&
                                <div className='w-full flex px-20'>
                                    <Alert open={isAlerted} onClose={() => setIsAlerted(false)} className='rounded-none border-l-4 border-[#2ec946] bg-[#018715]/10 font-medium text-[#18b52f]'>
                                        Booked successfully. Go check on the Booking page.
                                    </Alert>
                                </div>
                            }

                            {err &&
                                <div className='w-full flex px-20'>
                                    <Alert open={err} onClose={() => setErr(false)} className='rounded-none border-l-4 border-[#b90000] bg-[#870101]/10 font-medium text-[#b51818]'>
                                        Booking failed. Please try again!
                                    </Alert>
                                </div>
                            }
                        </DialogHeader>
                        <DialogBody>
                            <div className='w-full flex flex-col p-3'>
                                <Typography variant="h2" color="blue-gray" className="font-medium font-serif w-full text-center mb-4">
                                    Ride Details
                                </Typography>
                                <div className='w-full flex justify-around'>
                                    <div>
                                        <p><strong>Pickup Location:</strong> {pick}</p>
                                        <p><strong>Dropoff Location:</strong> {drop}</p>
                                        <p><strong>Final Price:</strong> {finalPrice} birr</p>
                                    </div>
                                    <div>
                                        <Button size="sm" className="bg-green-500" onClick={() => handleAltOpen(ride._id, ride.pickUp, ride.dropOff, ride.finalPrice)}>Confirm Booking</Button>
                                    </div>
                                </div>
                            </div>
                        </DialogBody>
                        </Dialog>

                        <Dialog open={altopen} handler={handleAltOpen} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}>
                            <DialogHeader>Confirmation</DialogHeader>
                            <DialogBody>
                                Confirm if you want to Book this room?
                            </DialogBody>
                            <DialogFooter>
                                <Button variant="text" color="red" onClick={() => handleAltOpen(ride._id, ride.pickUp, ride.dropOff, ride.finalPrice)} className="mr-1">
                                    <span>Cancel</span>
                                </Button>
                                <Button variant="gradient" color="green" onClick={handleBooking}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                </div>
            ))}
        </div>
    );
};

export default RideFilter;
