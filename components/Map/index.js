import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import Pins from "./Pins";

const CITIES = [
    { city: "New York", latitude: 40.6643, longitude: -73.9385 },
    { city: "Los Angeles", latitude: 34.0194, longitude: -118.4108 },
    { city: "Chicago", latitude: 41.8376, longitude: -87.6818 },
];

export default function Map() {
    const [state, setState] = useState({
        viewport: {
            width: "65vw",
            height: "48vh",
            // latitude: 48.138414, // munich
            // longitude: 11.579828,
            // latitude: 10.486258, // caracas
            // longitude: -66.893736,
            zoom: 1,
        },
    });

    return (
        <div id="map-container">
            <div id="map">
                <ReactMapGL
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxApiAccessToken="pk.eyJ1IjoianVhbm5hdmFzam4iLCJhIjoiY2tnbXNneTltMDlpaDJ6cHA2YmM0Z2h5MyJ9.MgM30ik-GKhst3AnIivVWw"
                    onViewportChange={viewport =>
                        setState({ ...state, viewport })
                    }
                    {...state.viewport}
                >
                    <Pins data={CITIES} />
                </ReactMapGL>
            </div>
        </div>
    );
}
