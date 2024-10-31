import React from "react";
import { useTranslation } from "react-i18next";

const Kids = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{t("Kids Section")}</h1>
      <p className="text-lg mb-2">
        {t("Welcome to the Kids section! Here you'll find movies and shows suitable for children.")}
      </p>

      <img
        src="..media/movie-kids.png"
    // Path relative to the public folder
        alt="Kids section "
        className="w-1/2 mx-auto mb-6 rounded-lg shadow-md"
      />
      {/* Add any other content or features for the Kids page here */}
    </div>
  );
};

export default Kids;
