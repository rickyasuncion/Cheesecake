
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { TextAlignJustifyIcon } from '@radix-ui/react-icons';


const Header = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const [open, setOpen] = React.useState(false);

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setLanguageOpen(false);
    i18n.changeLanguage(lng);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!languageOpen);
    setGenresDropdownOpen(false);
  };

  const toggleGenresDropdown = () => {
    setGenresDropdownOpen(!genresDropdownOpen);
    setLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setGenresDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genresRef]);

  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      {/* 左边部分 */}
      <div className="header-left">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/home">Cheesecake</Link>
        </h1>
        <nav className="ml-10 hidden xl:block">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white"><Link to="/movies">{t('Movies')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('More')}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-2">
        <form onSubmit={handleSearch} className="items-center hidden xl:flex">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("Search...")}
            className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
          />
          <Button type="submit" className="rounded-r-md">
            {t("Search")}
          </Button>
        </form>
        <Button asChild className="bg-transparent outline p-2 outline-red-600 hover:bg-transparent">
          <Link to={'/favourites'}>
            <FaHeart className='text-red-600 text-xl' />
          </Link>
        </Button>


        <div className=' hidden xl:flex '>
          <button className="text-gray-300 hover:text-white">
            <span className="material-icons">{t("notifications")}</span>
          </button>
          <div className="relative">
            <button
              className="text-gray-300 hover:text-white"
              onClick={toggleLanguageDropdown}
            >
              <span className="material-icons">{t("Language")}</span>
            </button>
            {languageOpen && (
              <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
                <button onClick={() => handleLanguageChange("en-US")}>
                  English
                </button>
                <button onClick={() => handleLanguageChange("zh-CN")}>
                  中文
                </button>
              </div>
            )}
          </div>
        </div>


        <Link className="text-gray-300 hover:text-white" to="/login">
          <span className="material-icons">{t("Login")}</span>
        </Link>


        <Sheet>
          <SheetTrigger className="xl:hidden">
            <TextAlignJustifyIcon className="text-white size-8" />
          </SheetTrigger>
          <SheetContent>
            <ul className="space-y-6 mt-10">
              <li className="text-gray-300 hover:text-white"><Link to="/movies">{t('Movies')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
              <li className="text-gray-300 hover:text-white"><Link to="/home">{t('More')}</Link></li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
