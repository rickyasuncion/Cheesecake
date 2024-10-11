import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { user, gitHubSignIn, googleSignIn, emailSignIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (provider) => {
    try {
      if (provider === "GitHub") {
        await gitHubSignIn();
      } else if (provider === "Google") {
        await googleSignIn();
      } else if (provider === "EmailPassword") {
        await emailSignIn(email, password);
      }
    } catch (error) {
      console.error(`Error during ${provider} login:`, error.message);
    }
  };

  useEffect(()=>{
    console.log(user);
    // if (user) {
    //   navigate("/");
    // }
  },[user, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1c1c1e] text-white">
      <h1 className="text-4xl font-bold mb-6">{t('Login to Cheesecake')}</h1>
      <input
        type="email"
        placeholder={t('Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <input
        type="password"
        placeholder={t('Password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-500 w-80"
      />
      <button
        className="bg-blue-600 text-white p-2 rounded w-80"
        onClick={() => handleLogin("EmailPassword")}
      >
        {t('Login')}
      </button>
      <div className="my-4 text-gray-400">{t('or login with')}</div>
      <div className="flex space-x-4">
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("GitHub")}
        >
          GitHub
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => handleLogin("Google")}
        >
          Google
        </button>
      </div>
      <div className="mt-4 text-gray-400">
        {t("Don't have an account?")}{" "}
        <button onClick={() => navigate("/signup")} className="text-blue-400">
          {t('Sign Up')}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

