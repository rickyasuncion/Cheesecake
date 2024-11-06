import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative"
    >
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("Search...")}
        className="bg-secondary rounded-full px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-40"
      />
      <Search onClick={handleSearch} className="absolute left-2 top-1.5 h-4 w-4 hover:cursor-pointer" />
    </form>
  );
};

export default SearchBar;
