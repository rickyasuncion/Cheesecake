import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../ui/input";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";

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
    <form onSubmit={handleSearch} className="items-center hidden xl:flex">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t("Search...")}
        className="bg-gray-800 text-white placeholder-gray-500 rounded-l-md p-2 w-64"
      />
      <Button type="submit" className="rounded-r-md">
        {t("Search")}
      </Button>
    </form>
  );
};

export default SearchBar;
