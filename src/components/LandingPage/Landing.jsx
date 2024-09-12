// import React, { useEffect, useState } from "react";
// import { Input } from "../UI/lib/button.jsx";
// import "./LandingPage/Landing.css";
// import { Button } from "../UI/lib/button.jsx";
// import MovieListView from "./MovieListView.jsx";
// import MovieCard from "../ui/lib/MovieCard";  



// const Landing = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [queriedMovies, setQueriedMovies] = useState([]);
//   const [queried, setQueried] = useState(false);
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [trendingTvShows, setTrendingTvShows] = useState([]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     const fetchedMovies = await fetchData(
//       `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
//     );
//     setQueriedMovies(fetchedMovies);
//     setQueried(true);
//   };

//   useEffect(() => {
//     async function populateData() {
//       const popularMovies = await fetchData(
//         `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=bbd89781c7835917a2decb4989b56470`
//       );
//       setTrendingMovies(popularMovies);

//       const populartrendingTvShows = await fetchData(
//         `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
//       );
//       setTrendingTvShows(populartrendingTvShows);
//     }
//     populateData();
//   }, []);

//   async function fetchData(url) {
//     const fetch = require("node-fetch");

//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//       },
//     };

//     let response = await fetch(url, options);
//     let data = await response.json();
//     let filteredData = data.results.filter(
//       (data) => data.media_type !== "person"
//     );
//     return filteredData;
//   }

//   return (
//     <div className="landing-page">
//       <h1 className="text-2xl font-semibold mb-4 text-center">
//         Welcome to Movie Recommendation
//       </h1>
//       <p className="text-center">Search for your favorite Movies below:</p>
//       <form
//         className="mt-2 flex w-fit items-center mx-auto"
//         onSubmit={handleSearchSubmit}
//       >
//         <Input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="mx-auto w-80"
//           placeholder="Type your search here..."
//         />
//         <Button className="px-10">Search</Button>
//       </form>
//       {queried && queriedMovies.length === 0 && <h2>No results found.</h2>}
//       {queried && queriedMovies.length > 0 && (
//         <MovieListView movies={queriedMovies} title={"Search Results"} />
//       )}
//       <MovieListView
//         movies={trendingMovies}
//         title={"Popular Movies"}
//       ></MovieListView>

//       <MovieListView
//         movies={trendingTvShows}
//         title={"Popular TV Shows"}
//       ></MovieListView>
//     </div>
//   );
// };

// export default Landing;
