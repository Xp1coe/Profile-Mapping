import React, { useState } from 'react';

const AdminLogin = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddProfile = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    // Reset form state or close form
    setShowForm(false);
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
            <input type="text" placeholder="Name" className="px-4 py-2 w-full rounded-md bg-transparent" />
          </div>
          <div className="my-4">
            <input type="text" placeholder="Description" className="px-4 py-2 w-full rounded-md bg-transparent " />
          </div>
          <div className="my-4">
            <input type="text" placeholder="Address" className="px-4 py-2 w-full rounded-md bg-transparent" />
          </div>
          <div className="my-4">
            <input type="text" placeholder="Achievements" className="px-4 py-2 w-full rounded-md bg-transparent" />
          </div>
          <div className="my-4">
            <input type="text" placeholder="Gender" className="px-4 py-2 w-full rounded-md bg-transparent" />
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
      {/* Add other admin functionalities/components here */}
    </div>
  );
};

export default AdminLogin;
