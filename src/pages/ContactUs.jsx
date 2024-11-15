import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // For now, we just log the form data, but this could be replaced with an API call.
    setStatus("Message Sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-black">{t("Contact Us")}</h1>
      <p className="text-lg text-center mb-6 text-gray-700">
        {t(
          "Have any questions or feedback? Reach out to us and we'll get back to you as soon as possible."
        )}
      </p>
      
      {/* Contact Information Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-4">{t("Reach Us Directly")}</h2>
        <p className="text-lg text-gray-700 mb-2">
          <strong>{t("Email")}:</strong>{" "}
          <a href="mailto:cheesecakemovies309@gmail.com" className="text-black hover:underline">
            cheesecakemovies309@gmail.com
          </a>
        </p>
        <p className="text-lg text-gray-700">{t("We will get back to you as soon as possible.")}</p>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-black mb-4">{t("Or Leave Us a Message")}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700 mb-2">{t("Your Name")}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("Enter your name")}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-lg text-gray-700 mb-2">{t("Your Email")}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Enter your email")}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-lg text-gray-700 mb-2">{t("Your Message")}</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("Write your message here...")}
              rows="5"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full p-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
          >
            {t("Send Message")}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div className="mt-4 text-center text-lg text-green-600">
            <span>{status}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
