import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/editChaletLocation.css";

const EditLocation = ({
  user,
  posts,
  updatePostLocation,
  canceleUpdatePost,
}) => {
  const { id } = useParams();
  let singleChalet = posts.filter((e) => e._id === id);
  singleChalet = singleChalet[0];

  const [latitude, setlatitude] = useState(
    singleChalet.chaletLocation.latitude
  );
  const [longitude, setlongitude] = useState(
    singleChalet.chaletLocation.longitude
  );

  console.log(typeof longitude);

  return (
    <React.Fragment>
      <div className="editChalet-location-container">
        <div
          style={{ color: "gray" }}
          onClick={() => canceleUpdatePost(user._id)}
          className="closeEdit-btn"
        >
          X
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          // method="POST"

          encType="multipart/form-data"
        >
          <div className="chalet-location-info">
            <div className="txt_field">
              <input
                type="number"
                name="latitude"
                maxLength={25}
                value={latitude}
                onChange={(e) => {
                  setlatitude(e.target.value);
                }}
                required
              />
              <span></span>
              <label>Latitude</label>
            </div>
            <div className="txt_field">
              <input
                type="number"
                name="longitude"
                value={longitude}
                onChange={(e) => {
                  setlongitude(e.target.value);
                }}
                required
              />
              <span></span>
              <label>Longitude</label>
            </div>

            <br />
          </div>

          <br />
          <div className="edit-location-buttons">
            <button
              disabled={
                latitude <= 90 &&
                latitude >= -90 &&
                latitude != 0 &&
                longitude <= 180 &&
                longitude >= -180 &&
                longitude != 0
                  ? false
                  : true
              }
              style={{ marginRight: 5 }}
              className="btn btn-primary"
              onClick={() =>
                updatePostLocation(singleChalet._id, latitude, longitude)
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditLocation;
