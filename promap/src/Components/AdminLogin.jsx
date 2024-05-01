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
      await axios.post('http://localhost:3001/Profile', formData);
      console.log('Form submitted successfully');
      // Reset form state or close form
      setShowForm(false);
      // Fetch profiles again to update the list
      const response = await axios.get('http://localhost:3001/Profile');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
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
          <h1 className='text-black bg-white font-mono text-2xl'>FILL THE PROFILE</h1>
          <div className="my-4">
            <input type="text" name="name" placeholder="Name" className="px-4 text-white py-2 w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="description" placeholder="Description" className="px-4 text-white py-2 w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="address" placeholder="Address" className="px-4 py-2 text-white w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="achievements" placeholder="Achievements" className="text-white px-4 py-2 w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="text" name="gender" placeholder="Gender" className="px-4 py-2 text-white w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="file" name="photo" accept="image/*" className="px-4 text-white py-2 w-full rounded-md bg-transparent" onChange={handleChange} required />
          </div>
          <div className="my-4">
            <input type="number" name="age" placeholder="Age" className="px-4 text-white py-2 w-full rounded-md bg-transparent" onChange={handleChange} required />
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
              Submit
            </button>
          </div>
        </form>
      )}
      <div className="flex flex-wrap mt-8">
        {profiles.map(profile => (
          <div key={profile.id} className="bg-white shadow-md p-4 m-4 w-72 rounded-md border border-black  ">
            <h2 className="text-lg font-bold">{profile.name}</h2>
            {profile.photo && <img src={profile.photo} alt={profile.name} className="w-10 h-32 mx-auto mt-4 rounded-full" />}
            <p>{profile.description}</p>
            <p>{profile.address}</p>
            <p>{profile.achievements}</p>
            <p>{profile.gender}</p>
            <p>{profile.age}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLogin;
