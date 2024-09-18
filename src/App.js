import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./_utils/auth-context";
import MovieDetails from "./pages/Details";
import Search from "./pages/Search";
import Favourties from "./pages/Favourties";
import Header from "./components/Layout/Header";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/search/:searched" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/details/:type/:id"
                        element={<MovieDetails />}
                    />
                    <Route path="/favourites" element={<Favourties />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
