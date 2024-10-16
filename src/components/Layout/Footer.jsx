// src/components/Footer.js
import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>{t("© 2024 Cheesecake. All rights reserved.")}</p>
      <button
        className="contact-us-button"
        onClick={() => navigate("/contact-us")}
      >
        {t("Contact Us")}
      </button>

      <button className="about-us-button" onClick={() => navigate("/about-us")}>
        {t("About Us")}
      </button>
    </footer>
  );
};

export default Footer;
