import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      {/* Options */}
      <div className="flex items-center gap-10">

        <Link><FaHome className='text-white text-2xl' /></Link>

        {/* Search Input */}
        <div className="mr-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 w-[500px] rounded-md bg-gray-800 text-white focus:outline-none focus:bg-gray-700" />
             <button className="ml-2 px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none">Search</button>
        </div>

        {/* Filter Option */}
        <div>
          <select
            className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          >
            <option value="">Filter</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
      </div>
      {/* Admin Login */}
      <Link to="/admin">
        <p className="text-white mr-4 hover:text-gray-400">Admin </p>
      </Link>
    </div>
  );
};

export default Header;
