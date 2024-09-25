
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../_utils/LanguageContext';
import '../LanguageSelector.css';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { FaHeart } from "react-icons/fa";

const Header = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const [open, setOpen] = React.useState(false);

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

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
            <li className="text-gray-300 hover:text-white"><Link to="/movies">{t('Movies')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('More')}</Link></li>
            {/* <li className="text-gray-300 hover:text-white">
              <Link to="/home">Movies</Link>
            </li>
            <li className="text-gray-300 hover:text-white text-nowrap">
              <Link to="/home">TV Shows</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">Genres</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/home">More</Link>
            </li> */}
          </ul>
        </nav>
      </div>
      <form onSubmit={handleSearch} className="flex justify-center items-center space-x-2 w-full">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-8/12"
        />
        <Button type="submit" className="rounded-r-md">
          Search
        </Button>
      </form>
      <div className="flex items-center space-x-2">

        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('Search...')}
            className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
          />
          <Button type="submit" className="rounded-r-md">
            {t('Search')}
          </Button>
        </form>

        <Button asChild className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent">
          <Link to={'/favourites'}>
            <FaHeart className='text-red-600 text-xl' />
          </Link>
        </Button>
        <button className="text-gray-300 hover:text-white">
          <span className="material-icons">{t('notifications')}</span>
        </button>
        <div className='relative'>
          <button className="text-gray-300 hover:text-white" onClick={toggleDropdown}>
            <span className="material-icons">{t('Language')}</span>
          </button>
          {open && (
            <div className="dropdown-menu">
              <button onClick={() => handleLanguageChange('en-US')}>English</button>
              <button onClick={() => handleLanguageChange('zh-CN')}>中文</button>
            </div>
          )}
        </div>
        {/* <Link className="text-gray-300 hover:text-white"
        to="/login">
          <span className="material-icons">{t('Login')}</span> */}
        {/* <button className="text-gray-300 hover:text-white">
          <span className="material-icons">language</span>
        </button> */}
        <Link className="text-gray-300 hover:text-white" to="/login">
          <span className="material-icons">{t('Login')}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
