
// src/pages/ContactUs.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{t("Contact Us")}</h1>
      <p className="text-lg mb-2">
        {t(
          "If you have any questions or feedback, feel free to reach out to us via email or fill out this form."
        )}
      </p>
      <p className="text-lg mb-2">
        <strong>{t("Email")}:</strong>{" "}
        <a href="mailto:cheesecakemovies309@gmail.com">
          cheesecakemovies309@gmail.com
        </a>
      </p>
      <p className="text-lg mb-2">
        {t("We will get back to you as soon as possible.")}
      </p>
    </div>
  );
};

export default ContactUs;
