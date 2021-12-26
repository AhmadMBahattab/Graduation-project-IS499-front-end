import React, { Component } from "react";
import http from "../../../Services/httpService";
import UpComingReservationsNavBar from "./upComingNavBar";
import "../../../styles/reservationsRequests.css";

const resRequestsEndpoint =
  "http://localhost:3000/myChalets/reservationsRequests";
const ReservationsRequests = ({
  user,
  filterdRequests,
  requestsNumber,
  acceptedRequests,
  canceledRequests,
}) => {
  const acceptRequests = async (request) => {
    let reserve = { ...request };
    reserve.reqState.requestAccept = true;
    const { data: reserveReq } = await http.put(resRequestsEndpoint, reserve);
    console.log("request accepted", reserveReq);
    window.location = "/myChalets/reservationsRequests/" + user._id;
  };
  const rejectRequest = async (request) => {
    let reserve = { ...request };
    reserve.reqState.requestReject = true;
    const { data: reserveReq } = await http.put(resRequestsEndpoint, reserve);
    console.log("request accepted", reserveReq);
    window.location = "/myChalets/reservationsRequests/" + user._id;
  };

  filterdRequests = filterdRequests.filter((item) => {
    return (
      item.reqState.requestSend == true &&
      item.reqState.requestAccept == false &&
      item.reqState.requestReject == false
    );
  });
  return (
    <div>
      <UpComingReservationsNavBar
        user={user}
        requestsNumber={requestsNumber}
        acceptedRequests={acceptedRequests}
        canceledRequests={canceledRequests}
        active="requests"
      />

      <br />
      {filterdRequests ? (
        <div className="requests-container">
          {filterdRequests.length == 0 ? (
            <p style={{ color: "gray", fontSize: 18 }}>
              No reservation requests...
            </p>
          ) : (
            <div className="reservation-header-container">
              <p>Chalet image</p>
              <p>Reserve information </p>
              <p>Reserve status</p>
            </div>
          )}
          {filterdRequests.map((item) => (
            <div key={item._id} className="single-request-container">
              <div className="request-image">
                <img
                  src={
                    require(`../../../Photos/${item.postInfo.postImage}`)
                      .default
                  }
                  alt="chalet"
                />
              </div>
              <div className="requets-info">
                <div>Username: </div>
                <div>@{item.userName}</div>
                <div className="first-col">Request by:</div>
                <div className="first-col">{item.fullName}</div>
                <div>Chalet name: </div>
                <div>{item.postInfo.chaletName}</div>
                <div className="first-col">On date: </div>
                <div className="first-col">{item.resDate}</div>
                <div>Contact info:</div>
                <div>{item.postInfo.phoneNumber}</div>
                <div className="first-col">Orignal price: </div>
                <div className="first-col">
                  {item.postInfo.orignalPrice} SAR
                </div>
                <div>Suggest Price: </div>
                <div>{item.postInfo.suggestPrice} SAR</div>
              </div>
              <div className="requests-buttons-container">
                <button
                  className="btn btn-primary"
                  onClick={() => acceptRequests(item)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => rejectRequest(item)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReservationsRequests;
