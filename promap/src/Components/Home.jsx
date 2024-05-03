import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Profile');
        setProfiles(response.data);
        setFilteredProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    let filtered = profiles;
    if (searchQuery) {
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filterOption) {
      filtered = filtered.filter(profile => profile.gender === filterOption);
    }
    setFilteredProfiles(filtered);
  }, [searchQuery, filterOption, profiles]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="text-center">
      <h1 className='font-mono text-3xl py-1'>PROFILES</h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 w-[300px] mr-2 rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700"
        />
      </div>
      <div className="mb-4 flex justify-center">
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none mr-2"
        >
          <option value="">Filter</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="bg-black shadow-md p-4 m-4 w-72 rounded-md border border-black text-white">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-bold">{profile.name}</h2>
                {profile.photo && <img src={profile.photo} alt={profile.name} className="w-24 h-32 mx-auto mt-4 rounded-md" />}
                <br />
                <p>Address: {profile.address}</p>
                <p>Achievements: {profile.achievements}</p>
                <p>Gender: {profile.gender}</p>
                <p>Age: {profile.age}</p>
              </div>
              <div className="flex justify-around mt-4">
                <Link to={`/maps/${profile.id}`} className="bg-blue-500 rounded-lg p-2 text-black mr-2">Summary</Link>
                <Link to={`/info/${profile.id}`} className="bg-blue-500 rounded-lg p-2 text-black">More Info</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
