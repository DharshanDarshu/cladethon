"use client";

import ReactMapGL, { Marker } from "react-map-gl";
import React, { useState, useEffect } from "react";

function Location() {
  const [lat, setLat] = useState(11.2775851);
  const [long, setLong] = useState(47.6236042);
  const [disabled, setDisabled] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: lat,
    longitude: long,
    zoom: 8,
  });
  const defaultProps = {
    longitude: 77.6896512,
    latitude: 12.9335296,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setDisabled(false);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          console.log(lat, long);
          setViewport({
            width: "100%",
            height: "100%",
            latitude: lat,
            longitude: long,
            zoom: 15,
          });
        },
      );
    }
  }, []);

  return (
    <>
      {!disabled && (
        <ReactMapGL
          {...viewport}
          mapStyle='mapbox://styles/darshandarshu/clfm3zng5002h01nnagnhg39w'
          mapboxAccessToken={process.env.mapbox_key}
          onMove={(nextViewport: any) =>
            setViewport(nextViewport)
          }>
          {/* <Marker
            longitude={long}
            latitude={lat}>
            <p className='z-50 text-white text-4xl'>
              You are here
            </p>
          </Marker> */}
        </ReactMapGL>
      )}
    </>
  );
}

export default Location;
