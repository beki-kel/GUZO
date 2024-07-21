import React ,{useState}from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPlane, faRightLeft,faClose, faPlaneDeparture, faPlaneArrival, faCalendarAlt, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import EthiopianAirlines from '../assets/Ethiopian_Airlines12.jpg';
import QRCode from "react-qr-code";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Button, Alert } from "@material-tailwind/react";

function FlightFilter({ flightResponse, flightLoading, flightError,setFilterState }) {
    const totalResults = (flightResponse?.outboundFlights?.length || 0) + (flightResponse?.returnFlights?.length || 0);
    const fromAirport = flightResponse?.outboundFlights[0]?.departure?.airport || '';
    const toAirport = flightResponse?.outboundFlights[0]?.arrival?.airport || '';
    const handleClick = () => setFilterState('')

    const [dep, setDep] = useState('');
    const [ret, setRet] = useState(null);
    const [open, setOpen] = useState(false);
    const [altopen, setAltOpen] = useState(false);
    const [isAlerted, setIsAlerted] = useState(false);
    const [err, setErr] = useState(false);

    const handleBooking = async () => {
        const userID = localStorage.getItem('_id');
    
        const reqBody = {
            userId: userID,
            type: "flight",
            details: {
                depflightId: dep,
                retflightId: ret,
            }
        };

        console.log(reqBody)
    
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
                console.log('Failed to book the flight');
                setErr(true);
            }
        } catch (error) {
            console.error('Error booking the flight:', error);
            setErr(true);
        }
    };

    const handleOpen = ( flyDep) => {
        setOpen(!open)
        setDep(flyDep);
        setIsAlerted(false);
        setErr(false);
    };

    const handleAltOpen = (flyDep) => {
        setDep(flyDep)
        setAltOpen(!altopen);
        setIsAlerted(false);
        setErr(false);
    };


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
                    <div className='w-full p-6 pb-0 flex justify-end items-end'>
                        <div className='w-6' onClick={handleClick}>
                            <FontAwesomeIcon icon={faClose} className='h-6 w-6'>close</FontAwesomeIcon>
                        </div>
                    </div>
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
                                <div key={flight._id} className='w-full flex flex-col space-y-6' p>
                                    <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out' onClick={() => {handleOpen(flight._id),setRet(null)}}>
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
                                        <div className='w-full flex justify-center p-5 py-8 shadow-lg border-2 rounded-xl transform hover:scale-105 hover:translate-x-2 hover:-translate-y-2 transition duration-300 ease-in-out' onClick={() => {handleOpen(flight._id),setRet(returnFlight._id)}}>
                                            
                                            <div className='w-1/2 py-6 h-64 bg-gradient-to-r from-orange-700 to-orange-500 rounded-md mr-2 flex items-center justify-center'>
                                                <div className='text-center'>
                                                    <img src={EthiopianAirlines} className='w-14 h-14 rounded-full bg-cover mx-auto mb-2' />
                                                    <p className='text-xl font-semibold text-white'>{flight.airline}</p>
                                                    <p className='text-sm text-white'>Flight Number: {flight.flightNumber}</p>
                                                    <p className='text-sm text-white'>Date: {flight.flightDate}</p>
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

                                    <Dialog size="xl" open={open} handler={() => handleOpen }>

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
                                                flight Details
                                            </Typography>
                                            <div className='w-full flex flex-col justify-center items-center'>
                                                <div className='w-full  flex justify-center p-8'>
                                                    <div className='w-1/2 text-2xl font-serif  p-4 text-black flex flex-col'>
                                                    <p className='text-start'><FontAwesomeIcon icon={faPlane} className='text-black mr-3'/><strong className='text-orange-700'>Air Lines:</strong> {flight.airline}</p>
                                                    <p className='text-start'><FontAwesomeIcon icon={faPlaneDeparture} className='text-black mr-3'/><strong className='text-orange-700'>From:</strong> {flight.departure.airport}</p>
                                                    <p className='text-start'><FontAwesomeIcon icon={faPlaneArrival} className='text-black mr-3'/><strong className='text-orange-700'> To:</strong> {flight.arrival.airport}</p>
                                                    <p className='text-start'><FontAwesomeIcon icon={faCalendarAlt} className='text-black mr-3'/><strong className='text-orange-700'> Date:</strong> {flight.flightDate}</p>
                                                    {ret?
                                                        <>
                                                            <p><FontAwesomeIcon icon={faMoneyBill1Wave} className='text-black mr-3'/><strong className='text-orange-700'> price</strong> ${totalPrice}</p>
                                                            <p><strong className='text-orange-700'> Return Flight:</strong> {returnFlight.flightDate}</p>
                                                        </>:<>
                                                        <p><FontAwesomeIcon icon={faMoneyBill1Wave} className='text-black mr-3'/><strong className='text-orange-700'> price</strong> ${flight.price}</p>
                                                        <p> No Return Flight</p>
                                                        </>
                                                            
                                                            }
                                                    </div>
                                                    <div className='w-1/2 flex flex-col items-center'>
                                                        <p className='text-black text-2xl'> More Info</p>
                                                        <QRCode
                                                            size={256}
                                                            value={ret? qrValue:qrValueOutbound}
                                                            viewBox={`0 0 256 256`}
                                                            fgColor='#e87431'
                                                        />
                                                    </div>
                                                    
                                                </div>
                                                <div className='pt-4'>
                                                    <Button size="sm" className="bg-orange-800" onClick={() => handleAltOpen(flight._id)}>Confirm Booking</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogBody>
                                    </Dialog>

                                    <Dialog open={altopen} handler={handleAltOpen} animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}>
                                        <DialogHeader>Confirmation</DialogHeader>
                                        <DialogBody>
                                            Confirm if you want to Book this flight?
                                        </DialogBody>
                                        <DialogFooter>
                                        <Button variant="text" color="red" onClick={() => handleAltOpen(flight._id)} className="mr-1">
                                                <span>Cancel</span>
                                            </Button>
                                            <Button variant="gradient" color="green" onClick={handleBooking}>
                                                <span>Confirm</span>
                                            </Button>
                                        </DialogFooter>
                                    </Dialog>
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
