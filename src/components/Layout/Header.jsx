import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../_utils/LanguageContext';
import '../LanguageSelector.css';
import { Button } from '../ui/button';
import Input from '../ui/input';
import { FaHeart } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';

const Header = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();

  const [open, setOpen] = React.useState(false);
  const [openMore, setOpenMore] = React.useState(false);  // Control More dropdown

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const toggleMoreDropdown = () => {
    setOpenMore(!openMore);  // Toggle "More" dropdown
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
        <nav className="ml-10 hidden xl:block">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white"><Link to="/movies">{t('Movies')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
            
            {/* Toggle More Dropdown */}
            <li className="text-gray-300 hover:text-white relative" onClick={toggleMoreDropdown}>
              {t('More')}
              {openMore && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/AboutUs')}>{t('About Us')}</button>
                  <button onClick={() => navigate('/terms-of-use')}>{t('Terms of Use')}</button>
                  <button onClick={() => navigate('/privacy-policy'  )}>{t('Privacy Policy')}</button>
                </div>
              )}

                
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="flex items-center space-x-2">
        <form onSubmit={handleSearch} className="items-center hidden xl:flex">
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

        {/* Language and Notifications */}
        <div className=' hidden xl:flex '>
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
        </div>

        {/* Login */}
        <Link className="text-gray-300 hover:text-white" to="/login">
          <span className="material-icons">{t('Login')}</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className='xl:hidden'>
            <TextAlignJustifyIcon className='text-white size-8' />
          </SheetTrigger>
          <SheetContent>
            <ul className="space-y-6 mt-10">
              <li className="text-gray-300 hover:text-white"><Link to="/movies">{t('Movies')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/aboutus">{t('About Us')}</Link></li>
            </ul>

            <form onSubmit={handleSearch} className="flex items-center mt-5">
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
