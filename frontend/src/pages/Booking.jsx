import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import { Placeholder } from 'rsuite';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

function Booking({ isLoggedIn }) {
    const [fetchData, setFetchData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('_id');
        if (!userId) {
            setError(new Error("User ID not found in local storage"));
            return;
        }

        const url = `http://localhost:5000/book/user/${userId}`;

        console.log('Fetching data from:', url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the data to include room price based on roomId
            const updatedData = data.map(item => {
                if (item.type === 'hotel' && item.details && item.details.hotelId && item.details.roomId) {
                    const hotel = item.details.hotelId;
                    const room = hotel.rooms.find(room => room._id.toString() === item.details.roomId.toString());
                    if (room) {
                        // Add the room's price to the booking details
                        return { ...item, details: { ...item.details, roomPrice: room.price, roomType: room.type } };
                    }
                }
                return item;
            });

            setFetchData(updatedData);
            console.log('Fetched data:', updatedData);
        })
        .catch(error => {
            setError(error);
            console.error('Error:', error);
        });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchData) {
        return(
            <div className='w-full min-h-screen flex p-10 mt-20'>
                <Placeholder.Graph active />
            </div>
        )

    }

    const types = ["hotel", "transportation", "flight", "events", "packages"];

    // Group fetched data by type
    const groupedData = types.reduce((acc, type) => {
        acc[type] = fetchData.filter(item => item.type === type);
        return acc;
    }, {});

    console.log('Grouped Data:', groupedData);

    const tabsData = types.map((type) => ({
        label: type.charAt(0).toUpperCase() + type.slice(1),
        value: type,
        desc: groupedData[type] // This should be an array of objects, each containing 'details'
    }));

    console.log('Tabs Data:', tabsData);

    return (
        <div>
            <div className='flex flex-col w-full bg-white'>
                <Navigation list={['Home', 'Blog', 'Bookings', 'Packages']} title='Exopia' isLoggedIn={isLoggedIn} App={false} />
                <div className='w-full mt-28 px-32 min-h-screen'>
                    <Tabs id="custom-animation" value={tabsData[0]?.value || ""} >
                        <TabsHeader>
                            {tabsData.map(({ label, value }) => (
                                <Tab key={value} value={value} className='text-orange-700 text-xl '>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody
                            animate={{
                                initial: { y: 250 },
                                mount: { y: 0 },
                                unmount: { y: 250 },
                            }}
                            className="mt-8"
                        >
                            {tabsData.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    <div className='w-full flex flex-wrap gap-10 justify-center items-center'>
                                        {desc.length > 0 ? (
                                            desc.map((item, index) => (
                                                <div key={index} className="p-3 mb-4 border-2 rounded-lg shadow-md w-1/4">
                                                    <p className='font-serif text-xl'>Status: {item.status === "pending" ? <span className="text-red-700">pending</span> : <span>Booked</span>}</p>
                                                    {/* Check if details exist and render accordingly */}
                                                    {item.details ? (
                                                        <>
                                                            <p className='font-serif text-xl'>Hotel: <span className='font-serif'>{item.details.hotelId.name || 'No hotel available'}</span></p>
                                                            <p className='font-serif text-xl'>Room Type: <span className='font-serif'>{item.details.roomType || 'No room type available'}</span></p>
                                                            {item.details.roomPrice ? (
                                                                <p className='font-serif text-lg'>Price: <span className='font-serif text-xl font-bold'>{item.details.roomPrice || 'Price not available'} Birr </span> </p>
                                                            ) : (
                                                                <p className='font-serif text-xl'>Price: <span className='font-serif'>Price not available</span></p>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p>No details available</p>
                                                    )}
                                                    <p className='font-sans text-orange-600'>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 mb-4 text-center">
                                                <p>No bookings yet</p>
                                            </div>
                                        )}
                                    </div>
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Booking;
