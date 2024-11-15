import React from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../_utils/LanguageContext";
import { useTheme } from "../pages/ThemeContext"; 
import { FiMoon, FiSun } from "react-icons/fi";
import { FaRegKeyboard } from "react-icons/fa";

const Settings = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div
      className={`container mx-auto p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } transition-colors duration-500`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">{t("Settings")}</h1>

      <div className="flex flex-col space-y-6 sm:space-y-6 sm:justify-start items-start mb-6">

        {/* Language Settings */}
        <div className="flex items-center space-x-2 w-full max-w-xs mx-auto sm:mx-0 h-16">
          <FaRegKeyboard className="text-lg" />
          <label htmlFor="language" className="mr-2 text-lg font-medium">{t("Language")}</label>
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="p-3 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-600 h-full"
          >
            <option value="en">
              <span role="img" aria-label="English">EN {t("English")}</span>
            </option>
            <option value="fr">
              <span role="img" aria-label="French">🇫🇷 {t("French")}</span>
            </option>
            {/* Add other languages here */}
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-2  max-w-xs mx-auto sm:mx-0 h-13">
          <FiMoon className="text-lg" />
          <label htmlFor="theme" className="mr-2 text-lg font-medium">{t("Theme")}</label>
          <button
            id="theme"
            onClick={toggleDarkMode}
            className={`p-3 rounded-md transition-all duration-300 ease-in-out transform w-full h-full ${
              darkMode ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-800"
            } hover:scale-110 focus:outline-none`}
          >
            {darkMode ? (
              <FiSun size={20} />
            ) : (
              <FiMoon size={20} />
            )}
            <span className="ml-2">{darkMode ? t("Light Mode") : t("Dark Mode")}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
