import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-black p-4 flex justify-between items-center">
      {/* Home Link */}
      <Link to="/"><FaHome className='text-white text-2xl' /></Link>
      
      {/* Admin Link */}
      <Link to="/admin">
        <p className="text-white mr-4 hover:text-gray-400">Admin</p>
      </Link>
    </div>
  );
};

export default Header;
