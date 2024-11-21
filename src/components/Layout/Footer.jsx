import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:3001/subscribe", {
        email,
      });
      if (response.data && response.data.message) {
        setMessage(response.data.message);
        setMessageColor("text-green-500");
      } else {
        setMessage("Subscription successful.");
        setMessageColor("text-green-500");
      }
      setEmail("");

      setTimeout(() => {
        setMessage("");
        setMessageColor("");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to subscribe. Please try again later.";

      setMessage(errorMessage);
      setMessageColor("text-red-500");
      console.error("Error subscribing:", error);

      setTimeout(() => {
        setMessage("");
        setMessageColor("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              CheeseCake
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <Link to={"/"} className="hover:underline me-4 md:me-6">
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="hover:underline me-4 md:me-6">
                {t("About")}
              </Link>
            </li>
            <li>
              <Link to={"/movies"} className="hover:underline me-4 md:me-6">
                {t("Movies")}
              </Link>
            </li>
            <li>
              <Link to={"/tvShows"} className="hover:underline me-4 md:me-6">
                {t("TV Shows")}
              </Link>
            </li>
            <li>
              <Button
                asChild
                className="bg-red-500 text-white hover:bg-red-800"
              >
                <Link to="/favourites" className="hover:underline">
                  {t("Favourites")}
                </Link>
              </Button>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        {/* Subscription & Links Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
          {/* Newsletter Subscription */}
          <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold">
              {t("Subscribe to our Newsletter")}
            </h3>
            <form
              className="flex space-x-2 w-full max-w-md"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder={t("Enter your email")}
                className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                {t("Subscribe")}
              </Button>
            </form>
            {loading ? (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>{" "}
                {/* Loading spinner */}
              </div>
            ) : (
              message && (
                <p className={`mt-4 text-sm ${messageColor}`}>{message}</p>
              )
            )}
          </div>

          {/* Footer Links */}
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-end space-x-6">
            <Link to="/privacy-policy" className="hover:underline">
              {t("Privacy Policy")}
            </Link>
            <Link to="/contact-us" className="hover:underline">
              {t("Contact Us")}
            </Link>
          </div>
        </div>

        {/* Footer Links for About, Terms of Use, etc. */}
        <div className="w-full flex justify-center sm:justify-end mt-6 space-x-6">
          <Link to="/about" className="hover:underline">
            {t("About")}
          </Link>
          <Link to="/terms-of-use" className="hover:underline">
            {t("Terms of Use")}
          </Link>
        </div>

        {/* Copyright Section */}
        <span className="block text-sm text-gray-300 sm:text-center mt-6">
          © 2024{" "}
          <Link to={"/"} className="hover:underline">
            Cheesecake
          </Link>
          . {t("All Rights Reserved")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
