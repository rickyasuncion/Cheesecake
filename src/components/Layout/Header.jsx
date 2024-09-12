import React from 'react';
import { clsx } from 'clsx';

const Header = () => {
  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">Cheesecake(Title still pending)</h1>
        <nav className="ml-10">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white"><a href="#">Movies</a></li>
            <li className="text-gray-300 hover:text-white"><a href="#">TV Shows</a></li>
            <li className="text-gray-300 hover:text-white"><a href="#">Genres</a></li>
            <li className="text-gray-300 hover:text-white"><a href="#">More</a></li>
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
        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">account_circle</span>
        </button>
      </div>
    </header>
  );
};

export default Header;