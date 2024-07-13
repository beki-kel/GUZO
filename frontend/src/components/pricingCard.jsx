import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const PricingCards = (props) => {
    const cardData= props.cardData
  return (
    <div className="w-full pt-[8rem] pb-10 px-4 ">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div key={index} className={`w-full shadow-sm flex flex-col p-4 mb-28 rounded-3xl hover:scale-105 duration-300   shadow-orange-600 bg-gradient-to-br from-red-400 to-orange-300`}>
            <img className="w-10/12 h-44 rounded-t-xl mx-auto mt-[-8rem] bg-white" src={card.image} alt="/"
            />
            <h2 className="text-2xl text-black  font-medium text-center pt-4 ">
              {card.title}
            </h2>
            <p className="text-center text-white text-3xl font-medium pt-2">{card.price} Birr</p>
            <div className="justify-center items-center font-medium ">
              {card.features.map((feature, index) => (
                
                <p
                  key={index}
                  className={`py-2 mx-6 border-b text-lg text-black items-center justify-center ${index === 0 ? "mt-8" : ""}`}>
                    <FontAwesomeIcon icon={faCheck} className="text-white mr-2 items-center justify-center" />
                  {feature}
                </p>
              ))}
            </div>
            
            <Link to='/login' className="flex justify-center items-center w-full">
                <button
                className={`bg-orange-600 text-white hover:bg-orange-700 hover:opacity-2 duration-150 w-[130px] rounded-md font-medium my-6 mx-auto px-6 py-2`}>
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