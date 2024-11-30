import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../_utils/LanguageContext";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../_utils/firebase";

const ProfileTab = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  const currentUser = auth.currentUser;

  const [profileSettings, setProfileSettings] = useState({
    username: currentUser?.displayName || "MovieBuff123",
    email: currentUser?.email || "user@example.com",
    photoURL: currentUser?.photoURL || "/api/placeholder/100/100", 
    language: language,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarUploading(true);
      try {
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`); 
        await uploadBytes(avatarRef, file);
        const photoURL = await getDownloadURL(avatarRef);

        await updateProfile(currentUser, { photoURL });
        setProfileSettings((prev) => ({ ...prev, photoURL }));
        setMessage(t("Avatar updated successfully!"));
      } catch (error) {
        setMessage(t("An error occurred while uploading the avatar: ") + error.message);
      } finally {
        setAvatarUploading(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setMessage("");

    try {
      if (currentUser) {
        if (profileSettings.username !== currentUser.displayName) {
          await updateProfile(currentUser, { displayName: profileSettings.username });
        }
        setMessage(t("Profile updated successfully!"));
      } else {
        setMessage(t("No authenticated user found."));
      }
    } catch (error) {
      setMessage(t("An error occurred: ") + error.message);
    } finally {
      setSaving(false);
    }
  };

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
            src={profileSettings.photoURL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
          {avatarUploading ? t("Uploading...") : t("Change Avatar")}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
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
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en-US">English</option>
            <option value="zh-CN">中文</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSaveChanges}
        disabled={saving}
        className={`px-4 py-2 ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white rounded-lg transition-colors`}
      >
        {saving ? t("Saving...") : t("Save Changes")}
      </button>

      {message && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            message.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ProfileTab;
