import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleArrowUp, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

  return (
    <div className='w-full bg-black flex relative'>
      <div className='w-2/12 flex flex-col items-center justify-center p-10'>
        <div className='flex items-center justify-center w-full space-x-4 mb-3'>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
        </div>

        <div className='flex items-center justify-center w-full space-x-4 mb-3'>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
        </div>

        <div className='flex items-center justify-center w-full space-x-4'>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
          <div>
            <FontAwesomeIcon icon={faCircle} style={{ color: "#ffffff" }} className='h-14' />
          </div>
        </div>
      </div>

      <div className='flex flex-col w-9/12 bg-black mb-4 justify-center items-center'>
        <div className='flex w-full justify-center items-center mb-2'>
          <FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "#ff622e" }} className='mr-2 h-6 mt-2' />
          <h2 className='text-4xl font-thin text-orange-600'>Exopia</h2>
        </div>
        <div className='flex flex-col w-full text-center justify-center items-center'>
          <p className='w-full text-xl text-white'>book your flights, rides, dining, events and more!</p>
        </div>
        <div className='flex flex-col w-full text-center justify-center items-center mt-10'>
          <p className='text-white text-2xl'>Contact Us</p>
          <p className='text-white text-lg font-thin'>Email</p>
          <p className='text-white text-lg font-thin'>Phone Number</p>
          <p className='text-white text-lg font-thin'>Location</p>
        </div>
        <div className='w-6/12 flex justify-center items-center mt-5 space-x-4 py-3'>
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#ffffff" }} className='h-14' />
          <FontAwesomeIcon icon={faXTwitter} style={{ color: "#ffffff" }} className='h-14' />
          <FontAwesomeIcon icon={faFacebook} style={{ color: "#ffffff" }} className='h-14' />
        </div>
      </div>

      <div className='absolute top-0 right-0 m-4' onClick={() => handleClick()}>
        <FontAwesomeIcon icon={faCircleArrowUp} className='h-14 text-orange-600' />
      </div>
    </div>
  )
}
export default Footer;
