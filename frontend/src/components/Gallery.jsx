import React, { useState, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDotCircle, faGlobe, faMapPin} from '@fortawesome/free-solid-svg-icons';
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
import './styles/gallery.css';



function Gallery() {
    const [hoveredImage, setHoveredImage] = useState('Wenchi');
    const typedElements = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        const options = [
        {
            strings: [' The Cradle of Human Civilization, where ancient history comes alive.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        },
        {
            strings: ['<i class="fas fa-history"></i> Discover the birthplace of coffee and ancient empires.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        },
        {
            strings: ['<i class="fas fa-tree"></i> Explore lush landscapes and unique wildlife.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        },
        {
            strings: [' Majestic mountains and breathtaking vistas await.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        },
        {
            strings: ['<i class="fas fa-landmark"></i> From rock-hewn churches to medieval castles, history is everywhere.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        },
        {
            strings: ['<i class="fas fa-compass"></i> Experience thrilling landscapes and vibrant cultures.'],
            typeSpeed: 50,
            backSpeed: 0,
            loop: false,
            showCursor: false,
            startWhenVisible:true,
        }
        ];

        const typedInstances = options.map((option, index) => new Typed(typedElements[index].current, option));

        return () => {
        typedInstances.forEach(typed => typed.destroy());
        };
    }, []);

    const handleMouseEnter = (place) => {
        setHoveredImage(place);
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <div className='w-full p-3 flex space-x-4 mb-10 pl-10'>
        <div className='w-6/12 flex flex-col justify-center items-center '>
            <p className='text-4xl nunito-title text-orange-600 pb-6'> ETHIOPIA </p>
            <div className='text-xl text-black dosis-feature mt-4 pb-6'>
                <div className='w-full flex items-center justify-start font-medium'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600 '/>
                    <span ref={typedElements[0]}></span>
                </div>
                <br/>

                <div className='w-full flex items-center justify-start'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600'/>
                    <span ref={typedElements[1]}></span>
                </div>
                <br/>

                <div className='w-full flex items-center justify-start'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600'/>
                    <span ref={typedElements[2]}></span>
                </div>
                <br/>
            
                <div className='w-full flex items-center justify-start'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600'/>
                    <span ref={typedElements[3]}></span>
                </div>
                <br/>

                <div className='w-full flex items-center justify-start'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600'/>
                    <span ref={typedElements[4]}></span>
                </div>
                <br/>

                <div className='w-full flex items-center justify-start'>
                    <FontAwesomeIcon icon={faMapPin} className='mr-2 text-orange-600'/>
                    <span ref={typedElements[5]}></span>
                </div>
                <br/>
            
            
            </div>
        </div>

        <div className='w-6/12 flex flex-wrap pr-10'>
            <div className='w-1/3 p-2 px-1 h-48 relative ' onMouseOver={() => handleMouseEnter('Wenchi')} onMouseOut={handleMouseLeave}>
            <img src={wenchi} className='w-full h-48 shadow-md rounded-tl-lg' />
            {hoveredImage === 'Wenchi' && (
                <div className='absolute rounded-md inset-0 h-48 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                Wenchi
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-64 relative' onMouseOver={() => handleMouseEnter('gondar')} onMouseOut={handleMouseLeave}>
            <img src={gondar} className='w-full h-64 shadow-md ' />
            {hoveredImage === 'gondar' && (
                <div className='absolute rounded-md inset-0 h-64 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                Gondar
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-48 relative' onMouseOver={() => handleMouseEnter('semen')} onMouseOut={handleMouseLeave}>
            <img src={semen} className='w-full h-48 shadow-md rounded-tr-lg' />
            {hoveredImage === 'semen' && (
                <div className='absolute rounded-md inset-0 h-48 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white'>
                Semien Mountains
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-56 relative' onMouseOver={() => handleMouseEnter('Gheralta')} onMouseOut={handleMouseLeave}>
            <img src={gheralta} className='w-full h-56 shadow-md mt-[-3.5rem]' />
            {hoveredImage === 'Gheralta' && (
                <div className='absolute rounded-md inset-0 h-56 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-3rem]'>
                Nothern-Tigray Gheralta
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-44 relative' onMouseOver={() => handleMouseEnter('harar')} onMouseOut={handleMouseLeave}>
            <img src={Harar} className='w-full h-44 shadow-md mt-2' />
            {hoveredImage === 'harar' && (
                <div className='absolute rounded-md inset-0 h-44 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white my-4'>
                Harar
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-40 relative' onMouseOver={() => handleMouseEnter('Lalibela')} onMouseOut={handleMouseLeave}>
            <img src={lalibela} className='w-full h-40 shadow-md mt-[-3.5rem]' />
            {hoveredImage === 'Lalibela' && (
                <div className='absolute rounded-md inset-0 h-40 mx-1 m-2 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-3rem]'>
                Lalibela
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-44 relative' onMouseOver={() => handleMouseEnter('Bale Mountains')} onMouseOut={handleMouseLeave}>
            <img src={bale} className='w-full h-44 shadow-md mt-[-3rem] rounded-bl-lg' />
            {hoveredImage === 'Bale Mountains' && (
                <div className='absolute rounded-md inset-0 h-44 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-2.5rem]'>
                Bale Mountains
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-40 relative' onMouseOver={() => handleMouseEnter('danakil depression')} onMouseOut={handleMouseLeave}>
            <img src={afar} className='w-full h-40 shadow-md mt-[-2rem]' />
            {hoveredImage === 'danakil depression' && (
                <div className='absolute rounded-md inset-0 h-40 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-1.5rem]'>
                Danakil depression
                </div>
            )}
            </div>

            <div className='w-1/3 p-2 px-1 h-60 relative' onMouseOver={() => handleMouseEnter('Axum')} onMouseOut={handleMouseLeave}>
            <img src={Axum} className='w-full h-60 shadow-md mt-[-7rem] rounded-br-lg' />
            {hoveredImage === 'Axum' && (
                <div className='absolute rounded-md inset-0 h-60 m-2 mx-1 flex items-center justify-center bg-black bg-opacity-25 text-xl font-serif text-white mt-[-6.5rem]'>
                Axum
                </div>
            )}
            </div>
        </div>
        </div>
    );
}

export default Gallery;
