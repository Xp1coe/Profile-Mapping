import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';

const Maps = ({ google }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchProfileAddresses = async () => {
      try {
        // Fetch profile data from the API
        const response = await axios.get('http://localhost:3001/Profile');

        // Extract addresses from the profiles
        const addresses = response.data.map(profile => profile.address);

        // Call the geocoding API for each address to get its coordinates
        const geocodeRequests = addresses.map(async address => {
          const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyDoJ38NH2JMFAI6YVFguiJKu-Tra-OQxV4`);
          const location = geocodeResponse.data.results[0].geometry.location;
          return { address, location };
        });

        // Wait for all geocoding requests to complete
        const resolvedGeocodeRequests = await Promise.all(geocodeRequests);

        // Update markers state with the resolved locations
        setMarkers(resolvedGeocodeRequests);
      } catch (error) {
        console.error('Error fetching profile addresses:', error);
      }
    };

    fetchProfileAddresses();
  }, []);

  return (
    <div>
      <h1>Google Maps</h1>
      <Map
        google={google}
        zoom={8}
        initialCenter={{ lat: 0, lng: 0 }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.address}
            position={marker.location}
            title={marker.address}
          />
        ))}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDoJ38NH2JMFAI6YVFguiJKu-Tra-OQxV4'
})(Maps);
