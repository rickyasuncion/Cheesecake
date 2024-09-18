import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { FaHeart } from "react-icons/fa";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/home">Cheesecake</Link>
        </h1>
        <nav className="ml-10">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">Movies</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">TV Shows</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">Genres</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">More</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
          />
          <Button type="submit" className="rounded-r-md">
            Search
          </Button>
        </form>

        <Button className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent">
          <Link to={'/favourites'}>
            <FaHeart className='text-red-600 text-xl' />
          </Link>
        </Button>

        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">notifications</span>
        </button>
        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">language</span>
        </button>
        <Link className="text-gray-300 hover:text-white" to="/login">
          <span className="material-icons">Login</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;