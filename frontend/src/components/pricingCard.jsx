import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const PricingCards = (props) => {
    const cardData= props.cardData
  return (
    <div className="w-full pt-[8rem] pb-10 px-4  ">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div key={index} className={`w-full shadow-sm flex flex-col p-4 my-4 rounded-3xl hover:scale-105 duration-300   shadow-orange-600`}>
            <img className="w-10/12 h-44 rounded-t-md mx-auto mt-[-8rem] bg-white" src={card.image} alt="/"
            />
            <h2 className="text-xl  font-medium text-center pt-4 ">
              {card.title}
            </h2>
            <p className="text-center text-orange-600 text-3xl font-medium pt-2">{card.price}</p>
            <div className="justify-center items-center font-medium">
              {card.features.map((feature, index) => (
                
                <p
                  key={index}
                  className={`py-2 mx-8 border-b items-center justify-center ${index === 0 ? "mt-8" : ""}`}>
                    <FontAwesomeIcon icon={faCheck} className="text-[#ff6d2e] mr-2 items-center justify-center" />
                  {feature}
                </p>


              ))}
            </div>
            <Link to='/login' className="flex justify-center items-center w-full">
                <button
                className={`bg-orange-500 text-white hover:bg-orange-600 hover:opacity-2 duration-150 w-[130px] rounded-md font-medium my-6 mx-auto px-6 py-2`}>
                Book now
                </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;