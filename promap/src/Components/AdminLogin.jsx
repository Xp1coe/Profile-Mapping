import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    achievements: '',
    gender: '',
    age: '',
    photo: ''
  });
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null); // State to track selected profile for editing

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

  const handleAddProfile = () => {
    setShowForm(true);
  };

  const handleEditProfile = (profileId) => {
    const selectedProfile = profiles.find(profile => profile.id === profileId);
    if (selectedProfile) {
      setFormData(selectedProfile);
      setSelectedProfileId(profileId);
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedProfileId) {
        // Update existing profile
        await axios.put(`http://localhost:3001/Profile/${selectedProfileId}`, formData);
        console.log('Profile updated successfully');
      } else {
        // Add new profile
        await axios.post('http://localhost:3001/Profile', formData);
        console.log('Profile added successfully');
      }
      // Reset form state or close form
      setShowForm(false);
      // Fetch profiles again to update the list
      const response = await axios.get('http://localhost:3001/Profile');
      setProfiles(response.data);
      setFormData({
        name: '',
        description: '',
        address: '',
        achievements: '',
        gender: '',
        age: '',
        photo: ''
      });
      setSelectedProfileId(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      name: '',
      description: '',
      address: '',
      achievements: '',
      gender: '',
      age: '',
      photo: ''
    });
    setSelectedProfileId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Profile/${id}`);
      // Fetch profiles again to update the list
      const response = await axios.get('http://localhost:3001/Profile');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <div className='text-center'>
      <h1>Admin Panel</h1>
      {!showForm ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 my-5 text-white text-center font-bold py-2 px-4 rounded"
          onClick={handleAddProfile}
        >
          + Add New Profile
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="w-96 mx-auto border border-black p-4 bg-black">
          <h1 className='text-black bg-white font-mono text-2xl'>{selectedProfileId ? 'EDIT PROFILE' : 'FILL THE PROFILE'}</h1>
          <div className="my-4">
            <input type="text" name="name" placeholder="Name" className="px-4 text-white py-2 w-full rounded-md bg-transparent" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="my-4">
            <textarea type="text" name="description" placeholder="Description" className="px-4 text-white py-2 w-full rounded-md bg-transparent" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="address" placeholder="Address" className="px-4 py-2 text-white w-full rounded-md bg-transparent" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="achievements" placeholder="Achievements" className="text-white px-4 py-2 w-full rounded-md bg-transparent" value={formData.achievements} onChange={handleChange} required />
          </div>
          <div className="my-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 py-2 text-white w-full rounded-md bg-black"
              required
            >
              <option className="text-white" value="">Select Gender</option>
              <option className="text-white" value="Male">Male</option>
              <option className="text-white" value="Female">Female</option>
            </select>
          </div>
          <div className="my-4">
            <input type="file" name="photo" accept="image/*" className="px-4 text-white py-2 rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="number" name="age" placeholder="Age" className="px-4 text-white py-2 w-full rounded-md bg-transparent" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {selectedProfileId ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      )}
      <div className="flex flex-wrap justify-center">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white shadow-md p-4 m-4 w-72 rounded-md border border-black flex flex-col justify-between">
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
              <button className="bg-red-500 p-2 text-white rounded-lg hover:bg-red-700" onClick={() => handleDelete(profile.id)}>Delete</button>
              <button className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600" onClick={() => handleEditProfile(profile.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLogin;
