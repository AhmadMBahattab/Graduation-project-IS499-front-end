import React, { Component, useState } from "react";
import ReactStars from "react-rating-stars-component";

const RateForm = ({
  user,
  singleChalet,
  rateChalet,
  showAndCloseRateComponent,
}) => {
  const [rate, setrate] = useState(0);
  const ratingChange = (rate) => {
    setrate(rate);
  };
  singleChalet = singleChalet[0];

  return (
    <div className="rate-container">
      <button
        className="close-rate-btn"
        style={{ color: "gray" }}
        onClick={showAndCloseRateComponent}
      >
        X
      </button>
      {singleChalet ? (
        <div className="chalet-info-container">
          <div className="chalet-image-rate">
            <img
              src={require(`../../Photos/${singleChalet.image}`).default}
              alt="chalet"
            />
          </div>
          <div className="chalet-name-rate">
            <h5>{singleChalet.chaletName}</h5>
          </div>
        </div>
      ) : null}
      <div className="stars-rate-container">
        <ReactStars size={40} isHalf={true} onChange={ratingChange} />
      </div>
      <div className="rate-buttons-container">
        <button
          className="btn btn-primary"
          onClick={() => rateChalet(rate, user, singleChalet)}
        >
          Submite
        </button>
      </div>
    </div>
  );
};

export default RateForm;
