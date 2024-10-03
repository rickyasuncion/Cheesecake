import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./_utils/auth-context";
import MovieDetails from "./pages/Details";
import { LanguageProvider } from "./_utils/LanguageContext";
import { useTranslation } from "react-i18next";
import Search from "./pages/Search";
import Favourties from './pages/Favourties'; 
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Movies from "./pages/Movies";
import AboutUs from './pages/AboutUs';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';


function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AuthContextProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Header />
          <main>
           <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/search/:searched" element={<Search />} />
            <Route path="/details/:type/:id" element={<MovieDetails />} />
            <Route path="/favourties" element={<Favourties />} /> 
            <Route path="*" element={<NotFound />} />
            <Route path="/About-us" element={<AboutUs />} /> 
            <Route path="/terms-of-use" element={<TermsOfUse/>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
            <Route path="/contact-us" element={<ContactUs/>} />
           </Routes>
           
          </main>
          <Footer/>
        </BrowserRouter>
      </LanguageProvider>
    </AuthContextProvider>
  );
}

export default App;
