import React, { useState } from 'react';
import wenchi from '../assets/wenchi carter.jpg';
import gondar from '../assets/Gondar-Castle.jpg';
import blueNile from '../assets/Blue-Nile-Falls-Ethiopia.jpg';
import gheralta from '../assets/nothern Tigray Gheralta.jpeg';
import Harar from '../assets/Harar.jpg';
import semen from '../assets/simien-mountains-tours.jpg';
import lalibela from '../assets/lalibela2.jpg';
import Axum from '../assets/Axum.jpg';
import afar from '../assets/Afar.jpg';
import bale from '../assets/Bale Mountains.jpg';

function Gallery() {

    const [hoveredImage, setHoveredImage] = useState('Wenchi');

    const handleMouseEnter = (place) => {
        setHoveredImage(place);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    
  return (
    <div className='w-full p-3 flex space-x-4 mb-10 pl-10'>
        <div className='w-7/12 flex flex-wrap  '>
        <div className='w-1/3 p-2 px-1 h-48 relative' onMouseOver={() => handleMouseEnter('Wenchi')} onMouseOut={ handleMouseLeave}>
                    <img
                        src={wenchi}
                        className='w-full h-48  shadow-md'
                    />
                    {hoveredImage === 'Wenchi' && (
                        <div className='absolute rounded-md inset-0 h-48 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                            Wenchi
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-64 relative' onMouseOver={() => handleMouseEnter('gondar')} onMouseOut={ handleMouseLeave}>
                <img src={gondar} className='w-full h-64  shadow-md' />
                {hoveredImage === 'gondar' && (
                        <div className='absolute rounded-md inset-0 h-64 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                            Gondar
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-48 relative' onMouseOver={() => handleMouseEnter('semen')} onMouseOut={ handleMouseLeave}>
                <img src={semen} className='w-full h-48  shadow-md' />
                {hoveredImage === 'semen' && (
                        <div className='absolute rounded-md inset-0 h-48 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                            Semien Mountains
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-56 relative' onMouseOver={() => handleMouseEnter('Gheralta')} onMouseOut={ handleMouseLeave}>
                <img src={gheralta} className='w-full h-56  shadow-md mt-[-3.5rem]' />

                {hoveredImage === 'Gheralta' && (
                        <div className='absolute rounded-md inset-0 h-56 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25  text-xl font-serif text-white mt-[-3rem]'>
                            Nothern-Tigray Gheralta
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-44 relative' onMouseOver={() => handleMouseEnter('harar')} onMouseOut={ handleMouseLeave}>
                <img src={Harar} className='w-full h-44  shadow-md mt-2' />
                {hoveredImage === 'harar' && (
                        <div className='absolute rounded-md inset-0 h-44 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white my-4'>
                            Harar
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-40 relative' onMouseOver={() => handleMouseEnter('Lalibela')} onMouseOut={ handleMouseLeave}>
                <img src={lalibela} className='w-full h-40  shadow-md mt-[-3.5rem]' />
                {hoveredImage === 'Lalibela' && (
                        <div className='absolute rounded-md inset-0 h-40 mx-1 m-2 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-3rem]'>
                            Lalibela
                        </div>
                    )}

            </div>
            <div className=' w-1/3 p-2 px-1 h-44 relative' onMouseOver={() => handleMouseEnter('Bale Mountains')} onMouseOut={ handleMouseLeave}>
                <img src={bale} className='w-full h-44  shadow-md mt-[-3rem]' />
                {hoveredImage === 'Bale Mountains' && (
                        <div className='absolute rounded-md inset-0 h-44 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-2.5rem]'>
                            Bale Mountains
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-40 relative' onMouseOver={() => handleMouseEnter('danakil depression')} onMouseOut={ handleMouseLeave}>
                <img src={afar} className='w-full h-40  shadow-md mt-[-2rem]' />
                {hoveredImage === 'danakil depression' && (
                        <div className='absolute rounded-md inset-0 h-40 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-1.5rem]'>
                            Danakil depression
                        </div>
                    )}
            </div>

            <div className=' w-1/3 p-2 px-1 h-60 relative' onMouseOver={() => handleMouseEnter('Axum')} onMouseOut={ handleMouseLeave}>
                <img src={Axum} className='w-full h-60  shadow-md mt-[-7rem]' />
                {hoveredImage === 'Axum' && (
                        <div className='absolute rounded-md inset-0 h-60 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-6.5rem]'>
                            Axum
                        </div>
                    )}
            </div>
        </div>
    </div>
  )
}

export default Gallery


