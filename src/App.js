import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./_utils/auth-context";
import MovieDetails from "./pages/Details";
import Header from "./components/Layout/Header";
import { LanguageProvider } from "./_utils/LanguageContext";
import { useTranslation } from "react-i18next";
// import i18n from "./i18n";

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <AuthContextProvider>
      <LanguageProvider>
        <BrowserRouter>      
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* Add MovieDetails route with dynamic movie ID */}
            <Route path="/details/:type/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthContextProvider>
  );
}

export default App;
