import React, { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { createUser } from "../_utils/firestore";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { user, gitHubSignIn, googleSignIn, emailSignIn } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      if (provider === "GitHub") {
        await gitHubSignIn();
      } else if (provider === "Google") {
        await googleSignIn();
      } else if (provider === "EmailPassword") {
        await emailSignIn(email, password);
      }
      console.log("Calling createUser after login");
      await createUser();
    } catch (error) {
      console.error(`Error during ${provider} login:`, error.message);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User logged in:", user.email);
      createUser();
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-yellow-500 mb-2">
                {t("Welcome back")}
              </h1>
              <p className="text-gray-500">
                {t("Please enter your details to sign in")}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin("EmailPassword");
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                  placeholder={t("Enter your email")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    placeholder={t("Enter your password")}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>{t("Sign in")}</span>
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t("Or continue with")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  onClick={() => handleLogin("GitHub")}
                >
                  <FaGithub size={20} />
                  <span>GitHub</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  onClick={() => handleLogin("Google")}
                >
                  <FaGoogle size={20} />
                  <span>Google</span>
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-sm text-gray-600">
              {t("Don't have an account?")}{" "}
              <Link
                to={"/signup"}
                className="text-yellow-500 hover:text-yellow-600 transition font-medium"
              >
                {t("Sign up for free")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
