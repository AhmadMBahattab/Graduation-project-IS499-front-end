import React, { Component } from "react";
import http from "../../../Services/httpService";
import UpComingReservationsNavBar from "./upComingNavBar";
import "../../../styles/canceledRequests.css";
import { toast } from "react-toastify";

const canceldRequestsEndPoint =
  "http://localhost:3000/myChalets/canceledRequests";

const CanceledRequests = ({
  user,
  requestsNumber,
  acceptedRequests,
  canceledRequests,
  filterCanceledRequests,
}) => {
  console.log(filterCanceledRequests);

  const deleteCanceledRequests = async (canceledReq) => {
    try {
      let { data: deleteReq } = await http.put(
        canceldRequestsEndPoint,
        canceledReq
      );
      console.log(deleteReq);
      toast.success("Deleted successfully ");

      setInterval(() => {
        window.location = "/myChalets/canceledRequests/" + user._id;
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <UpComingReservationsNavBar
        user={user}
        requestsNumber={requestsNumber}
        acceptedRequests={acceptedRequests}
        canceledRequests={canceledRequests}
        active="cancelRes"
      />
      <div className="canceled-reserves-container">
        {filterCanceledRequests.length == 0 ? (
          <p style={{ color: "gray", fontSize: 18 }}>No canceled requests...</p>
        ) : (
          <div className="reservation-header-container">
            <p>Chalet image</p>
            <p>Reserve information </p>
            <p>Canceled reason</p>
          </div>
        )}
        <br />
        {filterCanceledRequests.map((item) => (
          <div key={item._id} className="single-canceled-reserve-container">
            <div className="cancel-reserve-image">
              <img
                src={
                  require(`../../../Photos/${item.userAndpostInfo.postInfo.postImage}`)
                    .default
                }
                alt="chalet"
              />
            </div>
            <div className="cancel-reserve-info">
              <div>Username: </div>
              <div>@{item.userAndpostInfo.userName}</div>
              <div className="first-col">Request by:</div>
              <div className="first-col">{item.userAndpostInfo.fullName}</div>
              <div>Chalet name: </div>
              <div>{item.userAndpostInfo.postInfo.chaletName}</div>
              <div className="first-col">On date: </div>
              <div className="first-col">{item.userAndpostInfo.resDate}</div>
              <div>Contact info:</div>
              <div>{item.userAndpostInfo.postInfo.phoneNumber}</div>
              <div className="first-col">Orignal price: </div>
              <div className="first-col">
                {item.userAndpostInfo.postInfo.orignalPrice} SAR
              </div>
              <div>Suggest Price: </div>
              <div>{item.userAndpostInfo.postInfo.suggestPrice} SAR</div>
            </div>
            <div className="cancele-reserves-states-container">
              <p>{item.canceledReason}</p>
              {item.note.length != 0 ? <p>Note: {item.note}</p> : <p></p>}

              <button
                className="btn btn-danger"
                onClick={() => deleteCanceledRequests(item)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanceledRequests;
