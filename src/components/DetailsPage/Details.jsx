// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import {
//   updateUserRecentlyViewedMovies,
// } from "../../_utils/firestore";
// import Reviews from "./Reviews/Reviews";
// import DetailsInfo from "./DetailsInfo";
// import DetailsHeader from "./DetailsHeader";
// import Recommended from "./Recommended";

// const Details = ({ id: propId }) => {
//   const { type, id: movieId } = useParams();
//   const id = propId || movieId;

//   const [movie, setMovie] = useState(null);
//   const [trailerVideo, setTrailerVideo] = useState(null);
//   const [recommendedMovies, setRecommendedMovies] = useState([]);
//   const [englishHomepage, setEnglishHomepage] = useState(null);
//   const { t, i18n } = useTranslation();
//   const [isFree, setIsFree] = useState(false);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//         try {
//           // Fetch movie details in the selected language
//           const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
//           );
//           const data = await response.json();
  
//           const creditsResponse = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}/credits?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
//           );
//           const creditsData = await creditsResponse.json();
  
//           setMovie({
//             ...data,
//             cast: creditsData.cast,
//             crew: creditsData.crew,
//           });
  
//           // Fetch the English version of the movie details to always have the homepage link
//           const englishResponse = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
//           );
//           const englishData = await englishResponse.json();
//           setEnglishHomepage(englishData.homepage);
  
//           const providerResponse = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=bbd89781c7835917a2decb4989b56470`
//           );
//           const providerData = await providerResponse.json();
  
//           if (
//             (providerData.results.CA && providerData.results.CA.free) ||
//             (providerData.results.US && providerData.results.US.free)
//           ) {
//             setIsFree(true);
//           }
//         } catch (error) {
//           console.error("Error fetching movie details:", error);
//         }
//       };
  
//       const fetchMovieVideos = async () => {
//         try {
//           // Fetch trailer in the current language
//           const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
//           );
//           const data = await response.json();
  
//           // Check if there are no results in the current language and fallback to English
//           if (data.results.length === 0) {
//             const fallbackResponse = await fetch(
//               `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
//             );
//             const fallbackData = await fallbackResponse.json();
//             setTrailerVideo(
//               fallbackData.results.find(
//                 (video) => video.site === "YouTube" && video.type === "Trailer"
//               )
//             );
//           } else {
//             setTrailerVideo(
//               data.results.find(
//                 (video) => video.site === "YouTube" && video.type === "Trailer"
//               )
//             );
//           }
//         } catch (error) {
//           console.error("Error fetching movie videos:", error);
//         }
//       };
  
//       const fetchRecommendedMovies = async () => {
//         try {
//           const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
//           );
//           const data = await response.json();
  
//           const checkedMovies = await Promise.all(
//             data.results.map(async (recMovie) => {
//               try {
//                 const providerResponse = await fetch(
//                   `https://api.themoviedb.org/3/movie/${recMovie.id}/watch/providers?api_key=bbd89781c7835917a2decb4989b56470`
//                 );
//                 const providerData = await providerResponse.json();
//                 const isFree =
//                   (providerData.results.CA && providerData.results.CA.free) ||
//                   (providerData.results.US && providerData.results.US.free);
//                 return { ...recMovie, isFree: !!isFree };
//               } catch (error) {
//                 console.error("Error fetching providers for movie:", error);
//                 return { ...recMovie, isFree: false };
//               }
//             })
//           );
  
//           setRecommendedMovies(checkedMovies);
//         } catch (error) {
//           console.error("Error fetching recommended movies:", error);
//         }
//       };

//     const updateViewed = () => {
//       updateUserRecentlyViewedMovies(id);
//     };

//     updateViewed();
//     fetchMovieDetails();
//     fetchMovieVideos();
//     fetchRecommendedMovies();
//   }, [id, i18n.language]);

//   if (!movie) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         {t("Loading...")}
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto bg-zinc-900 text-secondary">
//       <div className="relative container p-0 overflow-hidden border border-zinc-700 rounded-md">
//         <DetailsHeader
//           movie={movie}
//           trailerVideo={trailerVideo}
//           setTrailerVideo={setTrailerVideo}
//           isFree={isFree}
//           englishHomepage={englishHomepage}
//         />
//         <DetailsInfo movie={movie} t={t} />
//         <Recommended
//           recommendedMovies={recommendedMovies}
//           type={type}
//           t={t}
//         />
//         <Reviews media_type="movie" media_id={id} />
//       </div>
//     </div>
//   );
// };

// export default Details;
