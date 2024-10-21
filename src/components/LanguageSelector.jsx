import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../_utils/LanguageContext';
import './LanguageSelector.css'; 

const LanguageSelector = () => {
    const { changeLanguage } = useLanguage();
    //   const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setOpen(false); // close the dropdown after selecting a language
  };

   const toggleDropdown = () => {
     setOpen(!open);
   };

  return (
    <div className="relative">
      <button 
        className="text-gray-300 hover:text-white"
        onClick={toggleDropdown}
      >
        Language
      </button>
      {open && (
        <div className="dropdown-menu">
          <button onClick={() => handleLanguageChange('en-US')}>English</button>
          <button onClick={() => handleLanguageChange('zh-CN')}>中文</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
