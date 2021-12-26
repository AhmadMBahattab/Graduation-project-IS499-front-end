import React, { Component, useState } from "react";

import { RadioGroup, RadioButton } from "react-radio-buttons";
import "../../../../styles/cancelReserveForm.css";

const CancelForm = ({ openOrCloseCanceleForm, cancelReserveForm }) => {
  const [checked, setchecked] = useState(null);
  const [textArea, settextArea] = useState("");

  const ressonsArr = [
    "I found better chalet",
    "I can't attend on the time",
    "Else",
  ];

  const handeleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    let item = e.target.value;
    setchecked(item);
  };
  const handleChangeTextArea = (e) => {
    let item = e.target.value;
    console.log(item);
    settextArea(item);
  };
  return (
    <div className="cnacel-form-container">
      <button
        className="close-reserve-form"
        style={{ color: "gray" }}
        onClick={openOrCloseCanceleForm}
      >
        X
      </button>

      {/* <form onClick={handeleSubmit}> */}
      <div className="form-check-container">
        {ressonsArr.map((item) => (
          <div>
            <input
              className="form-check-input"
              type="radio"
              value={item}
              name="reasons"
              onChange={handleChange}
            />{" "}
            <label className="form-check-label">{item}</label>
          </div>
        ))}
      </div>
      <br />
      <p style={{ color: "gray" }}>Note:</p>
      <textarea
        className="form-control"
        name="textarea"
        id="textarea"
        cols="50"
        rows="2"
        onChange={handleChangeTextArea}
      ></textarea>
      <br />
      <div className="cancel-buttons-container">
        <button
          className="btn btn-primary"
          disabled={checked ? false : true}
          onClick={() => cancelReserveForm(checked, textArea)}
        >
          Submit
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default CancelForm;
