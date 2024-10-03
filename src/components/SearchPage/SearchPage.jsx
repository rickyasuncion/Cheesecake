import React, { useState } from "react";
import SearchItems from "./SearchItems";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const [results, setResults] = useState([]);

  const { searched } = useParams();

  const handleSetResults = (res) => {
    setResults(res);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Search Movies and TV Shows
        </h1>
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

export default SearchPage;
