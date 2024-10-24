import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();
  
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend or email service)
    console.log(formData);
    // Reset the form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      {/* Contact Information Section */}
      <div className="md:w-2/3">
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

      {/* Form Section */}
      <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">{t("Contact Form")}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg mb-1">{t("Name")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg mb-1">{t("Email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg mb-1">{t("Message")}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {t("Send Message")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
