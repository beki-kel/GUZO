import React from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';

export default function CircularCarousel(props) {
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const { products } = props;

    const productTemplate = (product) => {
        if (!product) {
            return null;
        }

        return (
            <div className="border-2 shadow-xl  rounded-lg m-2 text-center pb-5  mb-8 flex flex-col">
                <div className="mb-3 w-full h-1/2 object-contain">
                    <img src={product.image} alt={product.Title} className="shadow-lg w-full h-72 rounded-t-lg" />
                </div>
                <div>
                    <h4 className="mb-1 text-orange-800 text-xl font-serif font-medium">{product.Title}</h4>
                    <h6 className="mt-0 mb-3 text-gray-900 ">{product.Description}</h6>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            {products && products.length > 0 ? (
                <Carousel 
                    value={products}
                    numVisible={3}
                    numScroll={3}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                />
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}
