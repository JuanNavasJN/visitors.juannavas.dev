import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import Pins from "./Pins";

// const CITIES = [
//     { city: "New York", latitude: 40.6643, longitude: -73.9385 },
//     { city: "Los Angeles", latitude: 34.0194, longitude: -118.4108 },
//     { city: "Chicago", latitude: 41.8376, longitude: -87.6818 },
// ];

const apiKey =
    "pk.eyJ1IjoianVhbm5hdmFzam4iLCJhIjoiY2tnbXNneTltMDlpaDJ6cHA2YmM0Z2h5MyJ9.MgM30ik-GKhst3AnIivVWw";

export default function Map({ data }) {
    const [cities, setCities] = useState([]);

    useEffect(
        _ => {
            let filtered = data.filter(
                r => r.location && r.location.coordinates[0] !== 0
            );

            let temp = filtered.map(r => ({
                country: r.country,
                name: r.city,
                latitude: r.location.coordinates[1],
                longitude: r.location.coordinates[0],
            }));

            setCities(temp);
        },
        [data]
    );

    const [state, setState] = useState({
        viewport: {
            width: "75vw",
            height: "58vh",
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
                    mapboxApiAccessToken={apiKey}
                    onViewportChange={viewport =>
                        setState({ ...state, viewport })
                    }
                    {...state.viewport}
                >
                    <Pins data={cities} />
                </ReactMapGL>
            </div>
        </div>
    );
}
