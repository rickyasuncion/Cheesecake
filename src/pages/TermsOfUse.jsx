import React from "react";
import { useTranslation } from "react-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{t("Terms of Use")}</h1>

      <h2 className="text-2xl font-semibold mt-4">
        {t("1. Acceptance of Terms")}
      </h2>
      <p>
        {t(
          "By accessing or using the Cheesecake website, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use our website."
        )}
      </p>

      <h2 className="text-2xl font-semibold mt-4">
        {t("2. Changes to Terms")}
      </h2>
      <p>
        {t(
          "We may update these Terms of Use from time to time. Any changes will be effective immediately upon posting on this page. Your continued use of the website after any changes signifies your acceptance of the updated terms."
        )}
      </p>

      <h2 className="text-2xl font-semibold mt-4">
        {t("3. Use of the Website")}
      </h2>
      <p>
        {t(
          "You agree to use the Cheesecake website for lawful purposes only. You must not use the site in a way that breaches any applicable local, national, or international law or regulation."
        )}
      </p>

      <h2 className="text-2xl font-semibold mt-4">{t("4. User Accounts")}</h2>
      <p>
        {t(
          "To access certain features of the website, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to update such information to keep it accurate, current, and complete."
        )}
      </p>
    </div>
  );
};

export default TermsOfUse;
