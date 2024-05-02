import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Profile');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="text-center">
      <h1 className='font-mono text-3xl py-1'>PROFILES</h1>
      <div className="flex flex-wrap justify-center">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-black shadow-md p-4 m-4 w-72 rounded-md border border-black text-white">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-bold">{profile.name}</h2>
                {profile.photo && <img src={profile.photo} alt={profile.name} className="w-24 h-32 mx-auto mt-4 rounded-md" />}
                <br />
                <p>Description: {profile.description}</p>
                <p>Address: {profile.address}</p>
                <p>Achievements: {profile.achievements}</p>
                <p>Gender: {profile.gender}</p>
                <p>Age: {profile.age}</p>
              </div>
              <div className="flex justify-around mt-4">
                {/* Use Link component with 'to' prop for navigation */}
                <Link to={`/maps/${profile.id}`} className="bg-blue-500 rounded-lg p-2 text-black">Summary</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
