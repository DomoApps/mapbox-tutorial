import React, { useEffect, useRef, useState } from "react";
import domo from "ryuu.js";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import rawMapStyle from "./map-style.json";
import "./App.css";

function App() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [points, setPoints] = useState([]);

  const POPULATION_LIMIT = 50000;
  const POINT_STEP = 100000;

  const getPointRadius = (row) => {
    const step = Math.min(
      Math.floor((row.dataPoint - POPULATION_LIMIT) / POINT_STEP),
      3
    );
    return 1 + step * 0.2;
  };

  const getPointColor = (row) => {
    const step = Math.min(
      Math.floor((row.dataPoint - POPULATION_LIMIT) / POINT_STEP),
      4
    );
    const colors = ["#8F1CCD", "#A221B9", "#E0329D", "#DF7B90", "#E8AD85"];
    return colors[step];
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await domo.get("/data/v1/geoData");
      const data = response.map((data) => ({
        name: data.city,
        latitude: data.lat,
        longitude: data.long,
        radius: getPointRadius(data),
        color: getPointColor(data),
      }));
      setPoints(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (points.length === 0) return;

    mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: rawMapStyle,
      maxBounds: [
        [-230, -60], // Southwest corner (hide Antarctica)
        [230, 70], // Northeast corner (keep map within bounds)
      ],
    });

    // After the map loads, add data points
    mapRef.current.on("load", () => {
      const dataPoints = {
        type: "FeatureCollection",
        features: points.map((point) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.longitude, point.latitude],
          },
          properties: {
            name: point.name,
            radius: point.radius,
            color: point.color,
          },
        })),
      };

      // Add the source
      mapRef.current.addSource("dataPoints", {
        type: "geojson",
        data: dataPoints,
      });

      // Add a circle layer
      mapRef.current.addLayer({
        id: "circle-layer",
        type: "circle",
        source: "dataPoints",
        paint: {
          "circle-radius": ["get", "radius"], // Circle radius
          "circle-color": ["get", "color"], // Circle color
          "circle-opacity": 0.7, // Circle opacity
        },
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, [points]);

  return (
    <div id="map-container" className="mapContainer" ref={mapContainerRef} />
  );
}

export default App;
