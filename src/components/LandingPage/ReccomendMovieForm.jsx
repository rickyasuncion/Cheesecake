import { use } from 'i18next';
import React, { useState } from 'react';

const RecommendMovieForm = () => {
    const [searchTerm, setSearchTerm] = useState();
    const [provider, setProvider] = useState();
    const [genres, setGenres] = useState();
    const [date, setDate] = useState();
    const [budget, setBudget] = useState();
    const [series, setSeries] = useState();
    const [popularity, setPopularity] = useState();
    const [rating, setRating] = useState();
    const [runtime, setRuntime] = useState();
 
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("hello");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    placeholder="Search for a movie..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default RecommendMovieForm;
