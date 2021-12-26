import React, { Component, useState } from "react";
import http from "../../../Services/httpService";
import { TiDelete } from "react-icons/ti";
import { MdEmail } from "react-icons/md";

import "../../../styles/dashboardCss/massagesContent.css";

const endPoint = "http://localhost:5000/dashboard/messages";
const Messages = ({ allData }) => {
  const deleteMessage = async (message) => {
    let messageId = message;
    const { data } = await http.put(endPoint, messageId);
    window.location.reload();
  };
  return (
    <React.Fragment>
      <p style={{ color: "gray" }}>
        <MdEmail /> Messages
      </p>
      {allData[4] ? (
        <div className="massages-container">
          {allData[4].length == 0 && (
            <p style={{ color: "gray" }}>No avalibale messages</p>
          )}
          {allData[4].map((item) => (
            <div className="single-massage">
              <button
                className="delete-massage"
                onClick={() => deleteMessage(item)}
              >
                <TiDelete fontSize={25} />
              </button>
              <div className="sender-info">
                <p className="style-header">Name :</p>
                <p className="style-header">{item.name} </p>
                <p className="style-header">Email :</p>
                <p className="style-header">{item.email} </p>
                <p className="style-header">Subject :</p>
                <p className="style-header">{item.subject} </p>
              </div>
              <div className="sender-body">
                <p>{item.massage}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Messages;
