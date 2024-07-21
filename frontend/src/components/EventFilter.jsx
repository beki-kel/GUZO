import React ,{useState} from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import Kebero from '../assets/Kebero.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocationDot, faStar ,faClose} from '@fortawesome/free-solid-svg-icons';
import HoverCard from "@darenft/react-3d-hover-card";
import "@darenft/react-3d-hover-card/dist/style.css";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Button, Alert } from "@material-tailwind/react";

function EventFilter({ eventResponse, eventLoading, eventError,setFilterState }) {
    const handleClick = () => setFilterState('')

    const [eventname, setEvent] = useState('');
    const [eventDate, setEventDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [altopen, setAltOpen] = useState(false);
    const [isAlerted, setIsAlerted] = useState(false);
    const [err, setErr] = useState(false);

    const handleBooking = async () => {
        const userID = localStorage.getItem('_id');
    
        const reqBody = {
            userId: userID,
            type: "event",
            details: {
                eventId: eventname,
                eventDate: eventDate,
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
                console.log('Failed to book the Event');
                setErr(true);
            }
        } catch (error) {
            console.error('Error booking the Event:', error);
            setErr(true);
        }
    };

    const handleOpen = ( event,date) => {
        setOpen(!open)
        setIsAlerted(false);
        setErr(false);
        setEvent(event)
        setEventDate(date)
    };

    const handleAltOpen = ( event,date) => {
        setEvent(event)
        setEventDate(date)
        setAltOpen(!altopen);
        setIsAlerted(false);
        setErr(false);
    };

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
                        <div className='w-full p-6 pt-0 flex justify-end items-end'>
                            <div className='w-6' onClick={handleClick}>
                                <FontAwesomeIcon icon={faClose} className='h-6 w-6'>close</FontAwesomeIcon>
                            </div>
                        </div>
                        <p className="text-3xl font-serif w-full text-center text-black">Found results for Events</p>
                        <div className='w-full mb-36 flex flex-wrap items-center justify-center'>
                            {eventResponse.map((event, index) => (
                                <>
                                <div key={index} className='w-1/4 mx-3 mt-36 flex flex-col justify-center items-center bg-gradient-to-br from-red-400 to-orange-300 rounded-2xl shadow-2xl hover:scale-105 text-white' onClick={()=> handleOpen(event._id,event.date)}>
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
                                                flight Details
                                            </Typography>
                                            <div className='w-full flex justify-around'>
                                                <div>
                                                    <p><strong>Dropoff Location:</strong> {eventname}</p>
                                                    <p><strong>Final Price:</strong> {eventDate} birr</p>
                                                </div>
                                                <div>
                                                    <Button size="sm" className="bg-green-500" onClick={() => handleAltOpen(event._id,event.date)}>Confirm Booking</Button>
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
                                    <Button variant="text" color="red" onClick={() => handleAltOpen(event._id,event.date)} className="mr-1">
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="green" onClick={handleBooking}>
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </Dialog>
                                </>
                                
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default EventFilter;
