import React, { Component, useState } from "react";
import http from "../../../Services/httpService";
import UpComingReservationsNavBar from "./upComingNavBar";
import CancelForm from "./inputs&forms/cancelReserveForm";
import "../../../styles/myNextReserve.css";
import { toast } from "react-toastify";

const resRequestsEndpoint =
  "http://localhost:3000/myChalets/reservationsRequests";
const myNextReserveEndPoint =
  "http://localhost:3000/myChalets/upcomingReservations";

const MyNextReserve = ({
  user,
  todayDate,
  requestsNumber,
  acceptedRequests,
  canceledRequests,
  myNextReserve,
}) => {
  const myNextReservePost = myNextReserve[0];
  const [openCanceleReserveForm, setopenCanceleReserveForm] = useState(false);

  const removeRequest = async (request) => {
    const { data: reserveReq } = await http.delete(resRequestsEndpoint);
    window.location = "/myChalets/upcomingReservations/" + user._id;
  };

  const cancelReserveForm = async (canceledReason, note) => {
    let cancleRes = {
      canceledReason,
      note,
      userAndpostInfo: myNextReservePost,
    };
    const { data } = await http.post(myNextReserveEndPoint, cancleRes);

    console.log(cancleRes);
    toast.success("Reserve request canceled successfully ");

    setInterval(() => {
      window.location = "/myChalets/upcomingReservations/" + user._id;
    }, 5000);
    setopenCanceleReserveForm(!openCanceleReserveForm);
  };
  const openOrCloseCanceleForm = () => {
    setopenCanceleReserveForm(!openCanceleReserveForm);
    console.log("cancele form reserve");
  };

  const compareDateThenDeleteOldRes = async (reserve) => {
    if (reserve.resDate.localeCompare(todayDate()) == -1) {
      const { data } = await http.put(myNextReserveEndPoint, reserve);
      window.location.reload();

      return console.log("reserve pasd date", data);
    }
    return console.log("reserve did not pass date yet");
  };
  if (myNextReservePost) {
    compareDateThenDeleteOldRes(myNextReservePost);
  }
  console.log(myNextReserve);
  return (
    <React.Fragment>
      <UpComingReservationsNavBar
        user={user}
        requestsNumber={requestsNumber}
        acceptedRequests={acceptedRequests}
        canceledRequests={canceledRequests}
        active="nextRes"
      />

      <div className="myNextReserve-container">
        {openCanceleReserveForm ? (
          <div className="overlay">
            <CancelForm
              openOrCloseCanceleForm={openOrCloseCanceleForm}
              cancelReserveForm={cancelReserveForm}
            />
          </div>
        ) : null}

        <br />

        {myNextReserve.length == 0 ? (
          <p style={{ color: "gray", fontSize: 18 }}>
            You don't have upcoming reserve...
          </p>
        ) : (
          <div className="reservation-header-container">
            <p>Chalet image</p>
            <p>Reserve information </p>
            <p>Reserve status</p>
          </div>
        )}

        <br />
        {myNextReserve.map((item) => (
          <>
            <div key={item._id} className="single-myNextReserve">
              <div className="myNextReserve-image">
                <img
                  src={
                    require(`../../../Photos/${item.postInfo.postImage}`)
                      .default
                  }
                  alt="chalet"
                />
                <h6></h6>
              </div>
              <div className="myNextReserve-info">
                <div>Username: </div>
                <div>@{item.userName}</div>
                <div className="first-col">Request by:</div>
                <div className="first-col">{item.fullName}</div>
                <div>Chalet name: </div>
                <div>{item.postInfo.chaletName}</div>
                <div className="first-col">On date: </div>
                <div className="first-col"> {item.resDate}</div>
                <div>Contact info:</div>
                <div>{item.postInfo.phoneNumber}</div>
                <div className="first-col">Orignal price: </div>
                <div className="first-col">
                  {item.postInfo.orignalPrice} SAR
                </div>
                <div>Suggest Price: </div>
                <div>{item.postInfo.suggestPrice} SAR</div>
              </div>
              <div className="myNextReserve-state-container">
                {item.reqState.requestAccept == false &&
                item.reqState.requestReject == false ? (
                  <div>
                    <p className="wait-conformation">
                      Waiting for confirmation
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeRequest(item)}
                    >
                      Cancel request
                    </button>
                  </div>
                ) : null}
                {item.reqState.requestAccept == true &&
                item.reqState.requestPaid == false &&
                item.reqState.requestReject == false ? (
                  <div>
                    <p className="Not-pied">Not payed</p>
                    <p className="accepted"> Accepted</p>
                    <button
                      className="btn btn-danger"
                      onClick={openOrCloseCanceleForm}
                    >
                      Cancel reserve
                    </button>
                  </div>
                ) : null}
                {item.reqState.requestAccept == true &&
                item.reqState.requestPaid == true &&
                item.reqState.requestReject == false ? (
                  <div>
                    <p className="pied">Payed</p>
                    <p className="accepted">Accepted</p>
                    <button
                      className="btn btn-danger"
                      onClick={openOrCloseCanceleForm}
                    >
                      Cancel reserve
                    </button>
                  </div>
                ) : null}
                {item.reqState.requestAccept == false &&
                item.reqState.requestReject == true ? (
                  <div>
                    <p className="rejected"> Rejected</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeRequest(item)}
                    >
                      Remove request
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ))}
      </div>
    </React.Fragment>
  );
};

export default MyNextReserve;
