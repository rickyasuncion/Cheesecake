import React from "react";
import { ThemeProvider } from "./pages/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./_utils/auth-context";
import { LanguageProvider } from "./_utils/LanguageContext";
import Search from "./pages/Search";
import Header from "./components/Layout/Header/Header";
import Movies from "./pages/Movies";
import MoviesWIthGenre from "./pages/MoviesWIthGenre";
import About from "./pages/About";
import Footer from "./components/Layout/Footer";
import ContactUs from "./pages/ContactUs";
import FreeMovies from "./pages/FreeMovies";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { MovieTrailerContextProvider } from "./providers/MovieTrailerProvider";
import Details from "./pages/Details";
import Favourites from "./pages/Favourites";
import { UserDataProvider } from "./providers/UserDataProvider";
import UsersPage from "./pages/UsersPage";
import Lists from "./pages/Lists";
import ForYou from "./pages/ForYou";

function App() {
  return (
    <AuthContextProvider>
      <UserDataProvider>
        <ThemeProvider>
          <MovieTrailerContextProvider>
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
                    <Route path="/search/:searched" element={<Search />} />
                    <Route path="/" element={<Movies />} />
                    <Route path="/type/:type" element={<Movies />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route
                      path="/type/:media/:type/:id"
                      element={<MoviesWIthGenre />}
                    />
                    <Route path="/details/:type/:id" element={<Details />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/favourites" element={<Favourites />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/free-movies" element={<FreeMovies />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/:tab" element={<UsersPage />} />
                    <Route path="/users/:tab/:id" element={<UsersPage />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="/for_you" element={<ForYou />} />
                  </Routes>
                </main>

                <Footer />
              </BrowserRouter>
            </LanguageProvider>
          </MovieTrailerContextProvider>
        </ThemeProvider>
      </UserDataProvider>
    </AuthContextProvider>
  );
}

export default App;
