import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="bg-[#1c1c1e]">
      <header className="py-3 container flex justify-between items-center">
        <NavBar />

        <div className="header-right flex items-center gap-3">
          <SearchBar />
          <LanguageSelector />
          <Menu />
        </div>
      </header>
    </div>
  );
};

export default Header;
