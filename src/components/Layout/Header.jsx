import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../_utils/LanguageContext';
import '../LanguageSelector.css';
// import i18n from '../../i18n';

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

  return (
    <header className="bg-[#1c1c1e] p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold"><Link to="/home">Cheesecake(Title still pending)</Link></h1>
        <nav className="ml-10">
          <ul className="flex space-x-6">
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Movies')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('TV Shows')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('Genres')}</Link></li>
            <li className="text-gray-300 hover:text-white"><Link to="/home">{t('More')}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
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
        <Link className="text-gray-300 hover:text-white"
        to="/login">
          <span className="material-icons">{t('Login')}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;