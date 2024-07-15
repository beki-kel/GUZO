import React ,{useState,useEffect} from 'react';
import Navigation from '../components/Navigation';
import { Placeholder } from 'rsuite';
import Footer from '../components/Footer';

import {Card,CardHeader,CardBody,Typography,Avatar,} from "@material-tailwind/react";
function Blog({isLoggedIn}) {

    const [blogResponse, setBlogResponse] = useState(null)

    useEffect(() => {
        const fetchFilteredResults = async () => {
            try {
                const response = await fetch('http://localhost:5000/search/blogs', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch filtered results');
                }
    
                const data = await response.json();
    
                if (data.length === 0) {
                    console.log('No results found');
                    setBlogResponse([]);
                } else {
                    console.log('Filtered results:', data);
                    setBlogResponse(data);
                }
            } catch (error) {
                console.error('Error fetching filtered results:', error);
                // Handle error state
            }
        };
    
        fetchFilteredResults();
    },[]);

    return (
        <div className='flex flex-col w-full min-h-screen bg-white'>
            <Navigation list={['Home', 'Blog', 'Bookings', 'Packages', 'Notification','Become a Partner',]} title='Exopia' isLoggedIn={isLoggedIn} App={true} />
            {
                blogResponse? <div className=" w-full flex flex-wrap space-x-4  items-center px-20 py-10 mt-20">
                <p className='w-full text-center font-serif text-3xl text-black p-6'>Blogs</p>
                <Card shadow={false} className="relative grid h-[30rem] w-1/2 max-w-[24rem] items-end justify-center overflow-hidden text-center hover:scale-105">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-background2 bg-cover bg-center"
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>

                <CardBody className="relative py-10 px-3 md:px-12">
                    <Typography
                    variant="h4"
                    color="white"
                    className="mb-2 font-semibold leading-[1.5] font-serif"
                    >
                    {blogResponse[0].header}
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-orange-800">
                        {blogResponse[0].author.fname}
                    </Typography>
                    <Avatar
                    size="xl"
                    variant="circular"
                    alt="tania andrew"
                    className="border-2 border-white"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                </CardBody>
                </Card>
            </div>:
            <div className='w-full min-h-screen flex p-10 mt-20'>
                <Placeholder.Graph active />
            </div>
            }
            
            <div className='w-full bg-gray-900'>
                <Footer/>
            </div>
        </div>
    )
}

export default Blog
