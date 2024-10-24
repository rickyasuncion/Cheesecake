import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{t("Privacy Policy")}</h1>
      <p className="text-lg mb-2">
        {t(
          "We take your privacy seriously. This privacy policy explains what personal data we collect and how we handle it."
        )}
      </p>

      <h2 className="text-2xl font-semibold mb-2">
        {t("1. Information We Collect")}
      </h2>
      <p className="text-lg mb-4">
        {t(
          "We may collect information such as your name, email address, and other details to enhance your experience."
        )}
      </p>

      <h2 className="text-2xl font-semibold mb-2">
        {t("2. How We Use Information")}
      </h2>
      <p className="text-lg mb-4">
        {t(
          "The information we collect helps us improve our services and provide better recommendations."
        )}
      </p>

      <h2 className="text-2xl font-semibold mb-2">{t("3. Security")}</h2>
      <p className="text-lg mb-4">
        {t(
          "We are committed to ensuring that your information remains secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard the information we collect online."
        )}
      </p>

      <h2 className="text-2xl font-semibold mb-2">
        {t("4. Changes to This Policy")}
      </h2>
      <p className="text-lg mb-4">
        {t(
          "We may update this privacy policy from time to time. Please check this page regularly to stay informed about updates."
        )}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
