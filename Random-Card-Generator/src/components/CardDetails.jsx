import React from "react";
import Chip from "./Chip";

export default function CardDetails({ updateCardState, item }) {
  return (
    <div
      className="flex flex-column card-details"
      style={{ position: "relative" }}
    >
      <h2 className="mt-2 px-3">Card 1</h2>
      <h3 className="ml-3 mt-3">Designation</h3>
      <div className="card-designation mt-2 ml-3 px-4 pb-2">
        {Array.isArray(item.chips) && item.chips.map((item)=> {
          return <Chip label={item} />
        })}
      </div>
      <h3 className="ml-3 mt-3">Card Details</h3>
      <div className="card-description px-4 py-2 mx-2 mt-2">
        <p>
        {item?.description}
        </p>
      </div>
      <div
        className="flex gap-2"
        style={{ position: "absolute", right: "4px", bottom: "4px" }}
      >
        <button className="card-details-btn" onClick={() => updateCardState()}>
          Go Back
        </button>
        <button className="card-details-btn">Delete Card</button>
      </div>
    </div>
  );
}
