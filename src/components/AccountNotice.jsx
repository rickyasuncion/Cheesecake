import { t } from "i18next";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountNotice = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-3/4 mx-auto p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {t("Account required")}
        </h3>
        <p className="text-red-700">{t("Please login or signup")}</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t("login")}
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {t("signup")}
        </button>
      </div>
    </div>
  );
};

export default AccountNotice;
