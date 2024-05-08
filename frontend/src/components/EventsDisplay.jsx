import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


export default function EventDisplay(props) {
    const items = props.items
    const islogged= props.isLoggedIn;

  return (
    <div className='w-full p-6 flex flex-wrap justify-center items-center bg-gray-50'>
        { items.map((item , index) => (
            <Link to="/login" key={index} className='w-1/6 mx-5 mt-2 hover:scale-105'>
                    <img src={item.image} className='w-full h-56 rounded-t-md  '/>
                    <div className='w-full h-12 bg-white flex items-center rounded-b-lg flex-wrap mb-4 shadow-sm shadow-black'>
                    <p className='mr-auto ml-2 font-thin text-xl '>{item.title} </p>
                    <FontAwesomeIcon icon={faStar} className=" mr-2 text-orange-600" />
                    </div>
            </Link>
        ))}
    </div>
  );
}

