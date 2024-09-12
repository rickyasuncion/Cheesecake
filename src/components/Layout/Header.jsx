import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold"><Link to="/home">Cheesecake(Title still pending)</Link></h1>
        <nav className="ml-10">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white"><Link to="/home">Movies</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">TV Shows</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">Genres</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">More</Link></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">notifications</span>
        </button>
        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">language</span>
        </button>
        <Link className="text-gray-300 hover:text-white"
        to="/login">
          <span className="material-icons">Login</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;