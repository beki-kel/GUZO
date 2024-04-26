import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal,faBatteryQuarter } from '@fortawesome/free-solid-svg-icons';



const MobilePhone = ({ image }) => {
  return (
    <div className="w-1/3 h-96 bg-white  flex flex-col items-center px-4 border-black">
      <div className="w-full py-2 bg-black rounded-t-xl flex justify-center items-center relative">
        <div className='w-2/12 h-2 absolute left-1  flex items-center space-x-2 pl-2'> 
            <FontAwesomeIcon icon={faSignal} className="text-white h-3"/>
            <p className='text-white text-xs'> 12:24 </p>
        </div>
        <div className='w-2/12 h-2 absolute right-0  flex items-center space-x-1'> 
            <FontAwesomeIcon icon={faBatteryQuarter} className='text-white' />
        </div>
        <div className="w-1/3 h-2 bg-white rounded-full ml-4 mx-2"></div>

      </div>
      <div className="flex-grow w-full bg-black overflow-hidden flex justify-center items-center px-1 py-1 border-black">
        <img src={image} alt="Display" className="object-cover h-full w-full rounded-md" />
      </div>
      <div className="w-full py-2 bg-black rounded-b-3xl text-center ">
      </div>
    </div>
  );
};

export default MobilePhone;
