


// src/pages/ContactUs.jsx
import React from "react";
import { useTranslation } from "react-i18next";


const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto p-8">

      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left side: Contact Information */}
        <div className="md:w-1/2">
          <p className="text-lg mb-2">
            If you have any questions or feedback, feel free to reach out to us via email or fill out the form.
          </p>
          <p className="text-lg mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:cheesecakemovies309@gmail.com">cheesecakemovies309@gmail.com</a>
          </p>
          <p className="text-lg mb-2">We will get back to you as soon as possible.</p>
        </div>

        {/* Right side: Contact Form */}
        <div className="md:w-1/2">
          <form className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your message"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

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
