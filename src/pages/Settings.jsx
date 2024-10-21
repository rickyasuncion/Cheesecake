import React from "react";
import '../App.css';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../_utils/LanguageContext";
import { useTheme } from '../pages/ThemeContext'; 

const Settings = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme(); 

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className={`container mx-auto p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-6">{t("Settings")}</h1>

      
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          {t("Language")}
        </label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 bg-gray-200 rounded-md dark:bg-gray-700"
        >
          <option value="en">{t("English")}</option>
          <option value="fr">{t("French")}</option>
          
        </select>
      </div>

      
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          {t("Dark Mode")}
        </label>
        <button
          onClick={toggleDarkMode} 
          className={`p-2 rounded-md ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200"}`}
        >
          {darkMode ? t("Disable Dark Mode") : t("Enable Dark Mode")}
        </button>
      </div>
    </div>
  );
};

export default Settings;
