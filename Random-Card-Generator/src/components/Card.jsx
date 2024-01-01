import React, { useState } from "react";
import Img1 from "../assets/images/melanie-magdalena-KpBAYMNf9Tw-unsplash.jpg";
import CardDetails from "./CardDetails";
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
export default function Card({item}) {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const updateCardState = () => {
    setShowCardDetails(false);
  }

  return (
    <div className={`Cards ${item?.theme} p-2 flex flex-column justify-content-center align-items-center`}>
      {showCardDetails ? (
        <>
          <CardDetails updateCardState = {updateCardState} item={item}/>
        </>
      ) : (
        <>

          <img className="card-image py-2 mb-2" src={Img1} />
          <div className="w-full flex justify-content-between">
            <h2 className="ml-2 text-3xl">{item?.title}</h2>
            <button className="card-details-btn mr-2" onClick={()=>setShowCardDetails(true)}>Card Details</button>
          </div>
        </>
      )}
    </div>
  );
}
// edit card option
// multiple color support
// infinite color support