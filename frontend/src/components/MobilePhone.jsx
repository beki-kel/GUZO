import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignal,faBatteryQuarter } from '@fortawesome/free-solid-svg-icons';
import { faCircle} from '@fortawesome/free-solid-svg-icons';

const MobilePhone = ({ image }) => {
  return (
    <div className="w-1/2 h-96   flex flex-col items-center justify-center px-4 border-black">
      <div className="w-full pt-3 pb-1 bg-gray-900 rounded-t-2xl flex justify-center items-center">
        <div className="w-1/2 h-3 bg-white rounded-full mx-2 flex justify-end items-center">
          <FontAwesomeIcon icon={faCircle} style={{ color: "#000000" }} className='h-2 pr-1' />
        </div>
      </div>
      <div className="flex-grow w-full bg-gray-900 overflow-hidden flex justify-center items-center px-1 py-1 border-black">
        <img src={image} alt="Display" className="object-cover h-full w-full rounded-md" />
      </div>
      <div className="w-full py-2 bg-black rounded-b-3xl text-center ">
      </div>
    </div>
  );
};

export default MobilePhone;
