import React, { useState, useEffect } from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import axios from 'axios';
import sheraton from '../assets/Sheraton_Hotel,_Addis_Ababa_(2058298419).jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faClose, faFireAlt, faStar, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faWifi,faTemperatureArrowUp,faTelevision,faMartiniGlass, faBellConcierge, faCouch, faEarDeaf, faSmokingBan, faDoorOpen, faEye, faPhone} from '@fortawesome/free-solid-svg-icons';
import {Alert,Card,CardHeader,CardBody,CardFooter,Typography,Button,Tooltip,IconButton,} from "@material-tailwind/react";
import {Dialog,DialogHeader,DialogBody,DialogFooter,Avatar, List,ListItem,ListItemPrefix,} from "@material-tailwind/react";
import Sherton2 from '../assets/sheraton.jpg';
import SheratonDb from '../assets/sheratonDouble.jpg';
import sheraton3 from '../assets/sheratonSuite.avif';
import sheraton4 from '../assets/SheratoRoom.jpg'

const data = [
    {
        imgelink:Sherton2,
    },
    {
        imgelink:sheraton3,
    },
    {
        imgelink:sheraton4,
    },
    {
        imgelink:SheratonDb,
    },
    {
        imgelink:sheraton,
    },
];

function StayFilterSection({ stayResponse, stayLoading, stayError, setStayResponse,setFilterState }) {
    const [nocities, setnoCities] = useState('some');
    const [amen, setAmen] = useState('some');
    const [selectedFilters, setSelectedFilters] = useState({
        stayLocation: '',
        amenities: [],
        accommodation: '',
        roomType: '',
        rating:0
});
    const [hotelBK,setHotel]=useState('');
    const [roomBk,setRoom]=useState('');
    const [roomID,setRoomId]=useState('')
    const [open, setOpen] = useState(false);
    const [altopen, setAltOpen] = useState(false);
    const [bookErr,SetBookErr]=useState(false);
    const [isAlerted, setIsAlerted] =useState(false);

    const handleAltOpen = (hotelId, roomTyp, roomI) => {setAltOpen(!altopen);setIsAlerted(false);SetBookErr(false);
        setHotel(hotelId);
        setRoom(roomTyp);
        setRoomId(roomI);
    };
    const handleOpen = () => {setOpen((cur) => !cur),setIsAlerted(false),SetBookErr(false)};
    const handleIsAlerted = () => setIsAlerted(true)

    const handleClick = () => setFilterState('')

    // Function to update stayResponse based on filters
    useEffect(() => {
        const fetchFilteredResults = async () => {
            try {
                // Filter out empty or null values from selectedFilters
                const filteredFilters = Object.fromEntries(
                    Object.entries(selectedFilters).filter(([key, value]) => {
                        if (key === 'amenities') {
                            return value.length > 0; // Include amenities if not empty array
                        } else if (key === 'rating') {
                            return value !== 0; // Include rating if not zero
                        }
                        return value !== '' && value !== null; // Include other filters if not empty or null
                    })
                );
    
                const response = await fetch('http://localhost:5000/search/filter/Accomadation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filteredFilters),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch filtered results');
                }
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log('No results found');
                    setStayResponse([]);
                } else {
                    console.log('Filtered results:', data);
                    setStayResponse(data);
                }
            } catch (error) {
                console.error('Error fetching filtered results:', error);
                // Handle error state
            }
        };
    
        fetchFilteredResults();
    }, [selectedFilters, setStayResponse]);

    const handleFilterChange = (type, value) => {
        setSelectedFilters((prevFilters) => {
            if (type === 'stayLocation' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
                return { ...prevFilters, [type]: value };
            }
            if (type === 'amenities') {
                const newAmenities = prevFilters.amenities.includes(value)
                    ? prevFilters.amenities.filter((item) => item !== value)
                    : [...prevFilters.amenities, value];
                return { ...prevFilters, amenities: newAmenities };
            }
            return prevFilters;
        });
    };

    const handleBooking = async( ) =>{
        const userID = localStorage.getItem('_id');

        const reqBody={
            userId: userID,
            type:"hotel",
            details:{hotelId : hotelBK, roomType:roomBk,roomId:roomID}
        }

        console.log(JSON.stringify(reqBody))
        try{
            const response = await fetch("http://localhost:5000/add/book", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            
            if(response.status === 201){
                const data = await response;
                console.log("Room Booked Successfully",data);
                handleIsAlerted( );
            }else{
                console.log('Failed to book the room',err);
                SetBookErr(true);
            }
            
        }catch(err){
            console.error('Error booking the room:', err);
            SetBookErr(true);
        }
    }

    const handleRemoveFilter = (type, value) => {
        setSelectedFilters((prevFilters) => {
            if (type === 'stayLocation' || type === 'accommodation' || type === 'roomType' || type === 'rating') {
                return { ...prevFilters, [type]: '' };
            }
            if (type === 'amenities') {
                return { ...prevFilters, amenities: prevFilters.amenities.filter((item) => item !== value) };
            }
            return prevFilters;
        });
    };

    const [active, setActive] = useState(sheraton);

    const handleIcon = (tyu) => {
        switch(tyu) {
            case 'Free Wi-Fi':
                return (<FontAwesomeIcon icon={faWifi} className='p-1 '/>);
            case 'Air Conditioning':
                return (<FontAwesomeIcon icon={faTemperatureArrowUp} className="p-1"/>);
            case 'TV':
                return (<FontAwesomeIcon icon={faTelevision} className="p-1"/>);
            case 'Mini Bar':
                return (<FontAwesomeIcon icon={faMartiniGlass} className="p-1"/>);
            case 'Room Service':
                return (<FontAwesomeIcon icon={faBellConcierge} className="p-1"/>);
            case 'Tea/Coffee Maker':
                return (<FontAwesomeIcon icon={faMugHot} className="p-1"/>);
            case 'Seating Area':
                return (<FontAwesomeIcon icon={faCouch} className="p-1"/>);
            case 'Soundproof Rooms':
                return (<FontAwesomeIcon icon={faEarDeaf} className="p-1"/>);
            case 'Non-smoking Rooms':
                return (<FontAwesomeIcon icon={faSmokingBan} className="p-1"/>);
            case 'Balcony':
                return (<FontAwesomeIcon icon={faDoorOpen} className="p-1"/>);
            case 'View':
                return (<FontAwesomeIcon icon={faEye} className="p-1"/>);
            case 'Telephone':
                return (<FontAwesomeIcon icon={faPhone} className="p-1"/>);
            default:
                return null;
        }
    }

    return (
        <div className='w-full my-10 flex flex-col'>
            {stayLoading && (
                <div className='w-full flex justify-center items-center mb-2 p-2'>
                    <img src={orangeLoading} alt="Loading" className="w-50 h-20 rounded-t-lg" />
                </div>
            )}

            {stayError && (
                <div className='w-full text-center text-2xl text-red-600 p-9'> {stayError} </div>
            )}

            {stayResponse && (
                <div className='w-full flex flex-col'>
                    <div className='w-full p-6 flex justify-end items-end'>
                        <div className='w-6' onClick={handleClick}>
                        <FontAwesomeIcon icon={faClose} className='h-6 w-6'>close</FontAwesomeIcon>
                        </div>
                    </div>
                    <div className='w-full flex'>
                        <div className='w-3/12 flex flex-col items-start justify-start text-center px-10 border-r-2 border-orange-500'>
                            <p className='text-2xl text-center m-2 mb-0 font-medium'> Filter By </p>
                            <p className='text-md mt-3 mx-2 font-medium text-center text-orange-500'>Cities </p>
                            {nocities === 'some' ? (
                                <form className='flex flex-col space-y-2 border-orange-500 text-start justify-start items-start opacity-100'>
                                    {['Addis Ababa', 'Hawassa', 'Jijiga', 'Semera'].map(city => (
                                        <div className='flex justify-center' key={city}>
                                            <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1"
                                                onChange={() => handleFilterChange('stayLocation', city)} checked={selectedFilters.stayLocation === city} />
                                            <label htmlFor={city}>{city}</label>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                        onClick={() => setnoCities('full')}
                                    >
                                        See More
                                    </button>
                                </form>
                            ) : (
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                    {[
                                        'Addis Ababa', 'Hawassa', 'Jijiga', 'Semera', 'Adama', 'Arba Minch', 'Assosa', 'Axum', 'Bahir Dar', 'Bale Robe',
                                        'Dembidollo', 'Dire Dawa', 'Gambella', 'Gode', 'Gondar', 'Humera', 'Jimma', 'Jinka', 'Kabri Dar', 'Kombolcha',
                                        'Lablibela', 'Mekelle'
                                    ].map(city => (
                                        <div className='flex justify-center' key={city}>
                                            <input type="radio" name="city" value={city} id={city} className="accent-orange-600 mr-1"
                                                onChange={() => handleFilterChange('stayLocation', city)} checked={selectedFilters.stayLocation === city} />
                                            <label htmlFor={city}>{city}</label>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                        onClick={() => setnoCities('some')}
                                    >
                                        See less
                                    </button>
                                </form>
                            )}

                            <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Amenities </p>
                            {amen === 'some' ? (
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                    {['Free Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service'].map(amenity => (
                                        <div className='flex justify-center' key={amenity}>
                                            <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1"
                                                onChange={() => handleFilterChange('amenities', amenity)} checked={selectedFilters.amenities.includes(amenity)} />
                                            <label htmlFor={amenity}>{amenity}</label>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                        onClick={() => setAmen('full')}
                                    >
                                        See More
                                    </button>
                                </form>
                            ) : (
                                <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                    {['Free Wi-Fi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Tea/Coffee Maker', 'Seating Area', 'Soundproof Rooms', 'Non-smoking Rooms', 'Balcony', 'View', 'Telephone'].map(amenity => (
                                        <div className='flex justify-center' key={amenity}>
                                            <input type="checkbox" name="amenities" value={amenity} id={amenity} className="accent-orange-600 mr-1"
                                                onChange={() => handleFilterChange('amenities', amenity)} checked={selectedFilters.amenities.includes(amenity)} />
                                            <label htmlFor={amenity}>{amenity}</label>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className='hover:text-orange-600 text-gray-400 underline decoration-[1px] w-full text-center'
                                        onClick={() => setAmen('some')}
                                    >
                                        See less
                                    </button>
                                </form>
                            )}

                            <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Accommodation Type</p>
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Hotel', 'Resort', 'Guest House'].map(Accom => (
                                    <div className='flex justify-center' key={Accom}>
                                        <input type="radio" name="accommodation" value={Accom} id={Accom} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('accommodation', Accom)} checked={selectedFilters.accommodation === Accom} />
                                        <label htmlFor={Accom}>{Accom}</label>
                                    </div>
                                ))}
                            </form>

                            <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Room Type </p>
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {['Single', 'Double', 'Triple', 'Quad', 'other'].map(room => (
                                    <div className='flex justify-center' key={room}>
                                        <input type="radio" name="roomType" value={room} id={room} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('roomType', room)} checked={selectedFilters.roomType === room} />
                                        <label htmlFor={room}>{room}</label>
                                    </div>
                                ))}
                            </form>

                            <p className='text-md mt-6 mx-2 font-medium text-center text-orange-500'>Rating </p>
                            <form className='flex flex-col space-y-2 text-start justify-start items-start opacity-100'>
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <div className='flex justify-center' key={rating}>
                                        <input type="radio" name="rating" value={rating} id={`rating-${rating}`} className="accent-orange-600 mr-1"
                                            onChange={() => handleFilterChange('rating', rating)} checked={selectedFilters.rating === rating} />
                                        <label htmlFor={`rating-${rating}`} className='flex items-center'>
                                            {Array(rating).fill().map((_, i) => (
                                                <FontAwesomeIcon icon={faStar} className='mr-1 text-orange-800' key={i} />
                                            ))}
                                        </label>
                                    </div>
                                ))}
                            </form>
                        </div>

                        <div className='w-9/12 pl-10 flex flex-col bg-white'>
                            <p className='text-2xl text-center m-2 mb-4'> Found {stayResponse.length === 1 ? "1 Result in Stays" : `${stayResponse.length} Results in Stays`} </p>
                            <div className='w-full mb-3 rounded-md flex flex-wrap'>
                                {Object.entries(selectedFilters).map(([type, value]) => (
                                    (type === 'amenities' ? value.map((amenity) => (
                                        <div className='bg-gray-300 text-black rounded-2xl px-3 py-2 flex items-center m-2' key={amenity}>
                                            <p>{amenity}</p>
                                            <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, amenity)} />
                                        </div>
                                    )) : (value ?
                                        <div className='bg-gray-300 text-black rounded-2xl px-3 py-2 flex items-center m-2' key={value}>
                                            {value ? <p>{value}</p> : <></>  }
                                            <FontAwesomeIcon icon={faXmark} className='ml-3' onClick={() => handleRemoveFilter(type, value)} />
                                        </div>:<></>
                                    ))
                                ))}
                            </div>

                            {stayResponse.map((stay) => (
                                <div className='w-full flex flex-wrap justify-start mb-4'>
                                    <Card className="w-5/12  shadow-lg mx-2 mb-5 border-[3px] bg-gray-50"  key={`${stay._id}`} onClick={handleOpen}>
                                        <CardHeader floated={false} color="blue-gray" className='shadow-none'>
                                        <img src={sheraton} alt="Loading" className="h-50 w-full "/>
                                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 "/>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="mb-3 flex items-center justify-between">
                                                <Typography variant="h4" color="white" className="font-bold font-serif flex flex-col text-black w-10/12 text-wrap">
                                                <span className='text-black pb-0'>{stay.name}</span> <p className='text-black text-sm font-medium'> {stay.city},{stay.location}</p>
                                                </Typography>
                                                <Typography className="flex items-center justify-center gap-1.5 font-normal text-black w-2/12">
                                                    {parseInt(stay.rating)}
                                                    <FontAwesomeIcon icon={faStar} className='text-orange-800' />
                                                </Typography>
                                            </div>
                                            

                                            <p className='text-black text-lg font-serif'> {stay.description} </p>

                                                <div className='w-full flex space-x-5 pl-3 py-2'>
                                                    {stay.rooms.map((room) => (<div className=' text-sm text-black' key={room._id}> <FontAwesomeIcon icon={faBed} className='text-orange-800'></FontAwesomeIcon> <span className='text-black'>{room.type !== "other"? room.type : room.otherType}</span> </div>))}
                                                </div>
                                            <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                                                <Tooltip content={`${Math.min(...stay.rooms.map(room => room.price))} - ${Math.max(...stay.rooms.map(room => room.price))} birr`}>
                                                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-300 p-3 text-gray-900 transition-colors hover:border-gray-100/10 hover:bg-gray-100 hover:!opacity-100 group-hover:opacity-70">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                    <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                                                        clipRule="evenodd"
                                                    />
                                                    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                                                    </svg>
                                                </span>
                                                </Tooltip>
                                                {stay.rooms.flatMap((room) => 
                                                    room.amenities.map((amenity) => (
                                                        <Tooltip content={amenity}>
                                                            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-300 p-3 text-black transition-colors hover:border-gray-100/10 hover:bg-gray-100 hover:!opacity-100 group-hover:opacity-70">
                                                                {handleIcon(amenity)}
                                                            </span>
                                                        </Tooltip>
                                                    ))
                                                )}
                                            </div>
                                    </CardBody>
                                    </Card>

                                    <Dialog size="xl" open={open} handler={handleOpen}>

                                        <DialogHeader className="justify-between flex-col">
                                        <div className="w-full flex items-end justify-end">
                                            <Button size="sm" onClick={handleOpen} className='bg-orange-700'>
                                                <FontAwesomeIcon icon={faClose}/>
                                            </Button>
                                        </div>

                                        {isAlerted &&
                                            <div className='w-full flex px-20'>
                                                <Alert  open={isAlerted} onClose={() => setIsAlerted(false)} className=' rounded-none border-l-4 border-[#2ec946] bg-[#018715]/10 font-medium text-[#18b52f] '>
                                                    booked Sucessfuly. Go Check on Booking page.
                                                </Alert>
                                            </div>
                                        }

                                        {bookErr&&
                                            <div className='w-full flex px-20'>
                                                <Alert  open={bookErr} onClose={() => SetBookErr(false)} className=' rounded-none border-l-4 border-[#b90000]/10 bg-[#870101]/10 font-medium text-[#b51818] '>
                                                    booking Failed. Please Try again!
                                                </Alert>
                                            </div>
                                        }

                                        </DialogHeader>
                                        <DialogBody>
                                        <div className='w-full flex flex-col p-3'>
                                            <Typography variant="h2" color="blue-gray" className="font-medium font-serif w-full text-center mb-4">
                                                {stay.name}
                                            </Typography>
                                            <div className='w-full flex'>
                                            <div className="grid gap-4 w-1/3  border-2 p-2 rounded-lg shadow-lg">
                                                <div>
                                                    <img
                                                    className="h-60 w-full max-w-full rounded-lg object-cover object-center"
                                                    src={active}
                                                    alt=""
                                                    />
                                                </div>
                                                <div className="grid grid-cols-5 gap-4">
                                                    {data.map(({ imgelink }, index) => (
                                                    <div key={`${index}23`}>
                                                        <img
                                                        onClick={() => setActive(imgelink)}
                                                        src={imgelink}
                                                        className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                        alt="gallery-image"
                                                        />
                                                    </div>
                                                    ))}
                                                </div>
                                                </div>
                                                <div className='w-8/12 flex flex-col justify-center'>
                                                    {stay.rooms.map((room) =>
                                                        <>
                                                        <Dialog
                                                            open={altopen}
                                                            handler={handleAltOpen}
                                                            animate={{mount: { scale: 1, y: 0 },unmount: { scale: 0.9, y: -100 },}}
                                                        >
                                                            <DialogHeader>Confirmation</DialogHeader>
                                                            <DialogBody>
                                                                Confirm if you want to Book this room?
                                                            </DialogBody>
                                                            <DialogFooter>
                                                            <Button
                                                                variant="text"
                                                                color="red"
                                                                onClick={handleAltOpen}
                                                                className="mr-1"
                                                            >
                                                                <span>Cancel</span>
                                                            </Button>
                                                            <Button variant="gradient" color="green" onClick={handleBooking}>
                                                                <span>Confirm</span>
                                                            </Button>
                                                            </DialogFooter>
                                                        </Dialog>

                                                        <List className='w-full ' onClick={() => handleAltOpen(stay._id, room.type, room._id)}>
                                                        <ListItem className='w-full px-4 border-2 shadow-md'>
                                                            <ListItemPrefix className='flex gap-4 text-xl w-1/6 text-black'>
                                                                <FontAwesomeIcon icon={faBed} className='text-orange-800'></FontAwesomeIcon>
                                                                <span className='text-gray-600'>{room.type !== "other"? room.type : room.otherType}</span>
                                                            </ListItemPrefix>
                                                            <p className='w-2/6 px-3 mr-3 text-center'>{room.description}</p>
                                                            <div className="w-2/6  group inline-flex items-center gap-1">
                                                                {room.amenities.map((amenity, index) => (
                                                                        <Tooltip content={amenity} key={index}>
                                                                            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                                                                                {handleIcon(amenity)}
                                                                            </span>
                                                                        </Tooltip>
                                                                    ))
                                                                }
                                                            </div>
                                                            <p className='flex items-center justify-center pr-4'>
                                                                <FontAwesomeIcon icon={faUser} className='mr-1'/> {room.capacity}
                                                            </p>
                                                            <div className='w-1/6 flex font-sans'>
                                                            Birr <span className='text-orange-600 text-2xl font-serif ml-1'>{room.price}</span>
                                                            </div>
                                                            <Button size="sm" className='bg-orange-700'> Book </Button>
                                                            </ListItem>
                                                        </List>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            </div>
                                            
                                        </DialogBody>
                                    </Dialog>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default StayFilterSection;
