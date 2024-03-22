import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/styles/CardSlider.css'; // Custom styles for the slider
import img from '../components/images/wonders.jpg';

function CardSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        adaptiveHeight: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='slider-container'>
            <Slider {...settings}>
                <div>
                    <img src={img} alt="Slide 1" />
                </div>
                <div>
                    <img src={img} alt="Slide 2" />
                </div>
                <div>
                    <img src={img} alt="Slide 3" />
                </div>
                <div>
                    <img src={img} alt="Slide 4" />
                </div>
                {/* Add more slides as needed */}
            </Slider>
        </div>
    );
}

export default CardSlider;
