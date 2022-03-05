import React, { Component, useState, useRef, useCallback } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { NavLink } from "react-router-dom";

const mapAccessToken =
  "pk.eyJ1IjoieHB5enpheCIsImEiOiJja3dlbmd6cmkwNmJlMnFtb2FzOWJrMzJ0In0.It08iMxXj_2tP3zu3fgfAQ";

const navControlStyle = {
  right: 10,
  top: 10,
};
const scaleControlStyle = {
  left: 20,
  top: 10,
};
const geolocateControlStyle = {
  right: 10,
  top: 10,
};

const MapGl = ({ posts }) => {
  const [viewport, setViewport] = useState({
    latitude: 24.713552,
    longitude: 46.675297,
    zoom: 5,
    pitch: 20,
  });

  const [selectedPost, setselectedPost] = useState(null);

  if (posts.length > 0) {
  }
  return (
    <div className="map-container">
      <ReactMapGL
        width="100%"
        height="100%"
        onClick={(e) => {
          e.preventDefault();
          setselectedPost(null);
        }}
        mapStyle={`mapbox://styles/mapbox/streets-v11`}
        mapboxApiAccessToken={mapAccessToken}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {posts.length > 0
          ? posts.map((post) => (
              <div>
                {" "}
                <Marker
                  latitude={post.chaletLocation.latitude}
                  longitude={post.chaletLocation.longitude}
                  offsetTop={(-viewport.zoom * 5) / 2}
                >
                  <button
                    className="marker-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setselectedPost(post);
                    }}
                  >
                    {" "}
                    <img
                      src="https://freesvg.org/img/map-pin.png"
                      width={viewport.zoom * 7}
                      height={viewport.zoom * 7}
                    />
                  </button>
                </Marker>
              </div>
            ))
          : null}
        {selectedPost && (
          <NavLink to={`/home/chalet/${selectedPost._id}`}>
            <Popup
              latitude={selectedPost.chaletLocation.latitude}
              longitude={selectedPost.chaletLocation.longitude}
              offsetTop={(-viewport.zoom * 5) / 2}
            >
              <div className="selected-post">
                <img
                  src={require(`../../Photos/${selectedPost.image}`).default}
                  alt="chalet"
                />
                <p>Name: {selectedPost.chaletName}</p>
                <p>Price: {selectedPost.price}</p>
              </div>
            </Popup>
          </NavLink>
        )}
        <GeolocateControl
          style={geolocateControlStyle}
          fitBoundsOptions={{ maxZoom: 5 }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
        <NavigationControl style={navControlStyle} />
      </ReactMapGL>
    </div>
  );
};

export default MapGl;
