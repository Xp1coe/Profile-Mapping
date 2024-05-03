import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Info = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams(); // Get profile ID from URL parameter

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Profile/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  return (
    <div className="text-center">
      <h1 className='font-mono text-3xl py-1'>PROFILE DETAILS</h1>
      {profile ? (
        <div className="bg-black shadow-md p-4 m-4 w-auto rounded-md border border-black text-white">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-lg font-bold">{profile.name}</h2>
              {profile.photo && <img src={profile.photo} alt={profile.name} className="w-32 h-44 mx-auto mt-4 rounded-md" />}
              <br />
              <hr className='border border-white m-2'/>
              <p>Description: {profile.description}</p>
              <hr className='border border-white m-2'/>
              <p>Address: {profile.address}</p>
              <p>Achievements: {profile.achievements}</p>
              <p>Gender: {profile.gender}</p>
              <p>Age: {profile.age}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Info;
