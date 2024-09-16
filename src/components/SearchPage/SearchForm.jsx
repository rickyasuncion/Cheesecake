import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(searched);
  }, [searched]);

  const fetchData = async (query) => {
    // Mock fetch function, replace with actual API call
    // Example: const response = await fetch(`your_api_endpoint?q=${query}`);
    // const data = await response.json();
    return [];
  };

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
          {results.length === 0 ? (
            <p className="text-center">No results found.</p>
          ) : (
            <SearchItems></SearchItems>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
