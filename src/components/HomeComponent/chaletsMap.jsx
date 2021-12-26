import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
// import ReactMapGl from "react-map-gl"

let myLocation = [];
mapboxgl.accessToken =
  "pk.eyJ1IjoieHB5enpheCIsImEiOiJja3dlbmd6cmkwNmJlMnFtb2FzOWJrMzJ0In0.It08iMxXj_2tP3zu3fgfAQ";
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [46.675297, 24.713552],
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C.",
      },
    },
  ],
};

const testMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(46.675297);
  const [lat, setLat] = useState(24.713552);
  const [zoom, setZoom] = useState(11);
  const [testGeojson, settestGeojson] = useState(geojson);

  // navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  //   enableHighAccuracy: true,
  // });

  // function successLocation(position) {
  //   setLng(position.coords.longtude);
  //   setLat(position.coords.latitude);
  // }
  // function errorLocation() {
  //   setLng(46.675297);
  //   setLat(24.713552);
  // }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  //create markers
  // testGeojson.features.map((fet) =>
  //   new mapboxgl.Marker().setLngLat(fet.geometry.coordinates).addTo(map)
  // );
  // map.addControl(new mapboxgl.NavigationControl(), "top-right");

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default testMap;
