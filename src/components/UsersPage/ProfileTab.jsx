import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileTab = () => {
  const { t } = useTranslation();
  const [profileSettings, setProfileSettings] = useState({
    username: "MovieBuff123",
    email: "user@example.com",
    language: "english",
    theme: "light",
  });

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t("Profile Settings")}</h2>
        <p className="text-gray-500">
          {t("Manage your account details and preferences")}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
          <img
            src="/api/placeholder/100/100"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          {t("Change Avatar")}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {t("Username")}
          </label>
          <input
            type="text"
            value={profileSettings.username}
            onChange={(e) =>
              setProfileSettings({
                ...profileSettings,
                username: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("Email")}</label>
          <input
            type="email"
            value={profileSettings.email}
            onChange={(e) =>
              setProfileSettings({ ...profileSettings, email: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {t("Language")}
          </label>
          <select
            value={profileSettings.language}
            onChange={(e) =>
              setProfileSettings({
                ...profileSettings,
                language: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t("Theme")}</label>
          <select
            value={profileSettings.theme}
            onChange={(e) =>
              setProfileSettings({ ...profileSettings, theme: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
