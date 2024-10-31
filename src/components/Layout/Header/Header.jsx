import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import Menu from "./Menu";
import { FaCirclePlay } from "react-icons/fa6";

import { Toggle } from "../../ui/toggle";
import { useMovieTrailerContext } from "../../../providers/MovieTrailerProvider";

const Header = () => {
  const { toggleTrailerState } = useMovieTrailerContext();

  return (
    <div className="bg-[#1c1c1e]">
      <header className="py-3 container flex justify-between items-center">
        <NavBar />

        <Toggle className="text-white" onPressedChange={toggleTrailerState} >
          <FaCirclePlay className="size-6" />
        </Toggle>
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
