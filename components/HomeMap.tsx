import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface HomeLocation {
  city: string;
  country: string;
}

interface HomeMapProps {
  location: HomeLocation;
}

const HomeMap: React.FC<HomeMapProps> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location.city
          )}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          console.error("No results found for the specified location.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [location.city]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      {coordinates ? (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={coordinates}
            zoom={12}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default HomeMap;
