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
import Favourties from "./pages/Favourties";
import Header from "./components/Layout/Header";
import Movies from "./pages/Movies";
import FilteredContent from "./pages/FilteredContent";
import MoviesWIthGenre from "./pages/MoviesWIthGenre";
import TvShows from "./pages/TvShows";
import About from "./pages/About";
import Footer from "./components/Layout/Footer";
import ContactUs from "./pages/ContactUs";
import SimilarLiked from "./pages/SimilarLiked";

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
                            <Route path="/about" element={<About />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route
                                path="/favourites/similar"
                                element={<SimilarLiked />}
                            />
                            <Route
                                path="/movies/:type/genre/:genreId"
                                element={<MoviesWIthGenre />}
                            />
                            <Route path="/tvShows" element={<TvShows />} />
                            <Route
                                path="/search/:searched"
                                element={<Search />}
                            />
                            <Route
                                path="/details/:type/:id"
                                element={<MovieDetails />}
                            />
                            <Route
                                path="/favourites"
                                element={<Favourties />}
                            />
                            <Route
                                path="/filtered-content"
                                element={<FilteredContent />}
                            />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                        </Routes>
                    </main>

                    <Footer />
                </BrowserRouter>
            </LanguageProvider>
        </AuthContextProvider>
    );
}

export default App;
