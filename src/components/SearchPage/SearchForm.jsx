import React, { useState } from "react";
import { Button } from "../ui/button";
import Input from "../ui/input";
import SearchItems from "./SearchItems";
import { useNavigate, useParams } from "react-router-dom";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { searched } = useParams();

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const handleSetResults = (res) => {
    setResults(res);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Search Movies and TV Shows
        </h1>
        <form onSubmit={handleSearch} className="flex justify-center mb-4">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type your search here..."
            className="mx-2 w-1/2"
          />
          <Button type="submit">Search</Button>
        </form>
        <div>
          {results.length === 1 ? (
            <p className="text-center">No results found.</p>
          ) : (
            <SearchItems onSetResult={handleSetResults} searchTerm={searched}></SearchItems>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
