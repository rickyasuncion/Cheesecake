import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../_utils/LanguageContext";

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);

  const handleLanguageChange = (lng) => {
    changeLanguage(lng);
    setLanguageOpen(false);
  };

  return (
    <div className="relative">
      <button className="hover:text-yellow-400" onClick={() => setLanguageOpen((prev) => !prev)}>
        <span className="material-icons">{t("Language")}</span>
      </button>
      {languageOpen && (
        <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10">
          <button onClick={() => handleLanguageChange("en-US")}>English</button>
          <button onClick={() => handleLanguageChange("zh-CN")}>中文</button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
