import React, { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { emailSignUp } = useUserAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignUp = async () => {
    try {
      await emailSignUp(email, password);
      console.log("Successfully signed up!");
    } catch (error) {
      console.log("Error during sign up:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1e] text-white">
      <h1 className="text-4xl font-bold mb-6">{t('Sign Up for Cheesecake')}</h1>
      <input
        type="text"
        placeholder={t('Username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <input
        type="email"
        placeholder={t('Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder={t('Password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <div className="mb-4">
        <label className="flex items-center text-gray-400">
          <input
            type="checkbox"
            checked={passwordVisible}
            onChange={() => setPasswordVisible(!passwordVisible)}
            className="mr-2"
          />
          {t('Show Password')}
        </label>
      </div>
      <button
        className="bg-blue-600 text-white p-2 rounded w-80"
        onClick={handleSignUp}
      >
        {t('Sign Up')}
      </button>
    </div>
  );
};

export default SignUp;
