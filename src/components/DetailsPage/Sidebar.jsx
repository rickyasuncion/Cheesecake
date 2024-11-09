import React, { useEffect, useState } from "react";

const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const Sidebar = ({ movie, cast, crews, type }) => {
  const filteredCast = cast.filter((actor) => actor.known_for_department === "Acting").slice(0, 5);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    if (crews) {
      const filteredData = crews.filter((crew) => crew.job === "Director");
      setDirectors(filteredData);
    }
  }, [crews]);

   if (type=== "movie") return (
     <div className="space-y-6">
       <div>
         <h3 className="text-lg font-semibold mb-2">Details</h3>
         <div className="space-y-3 text-gray-300">
           <div>
             <span className="text-gray-500">Release Date:</span>{" "}
             {movie.release_date}
           </div>
           <div>
             <span className="text-gray-500">Revenue:</span> $
             {movie.revenue && movie.revenue.toLocaleString()}
           </div>
           <div>
             <span className="text-gray-500">Runtime:</span> {movie.runtime}{" "}
             mins
           </div>
           <div>
             <span className="text-gray-500">Director:</span>{" "}
             {directors.length > 0
               ? directors.map((director) => director.name).join(", ")
               : "No Director"}
           </div>
         </div>
       </div>

       <div>
         <h3 className="text-lg font-semibold mb-2">Genres</h3>
         <div className="flex flex-wrap gap-2">
           {movie.genres &&
             movie.genres.map((genre, index) => (
               <span
                 key={index}
                 className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
               >
                 {GENRES[genre.id]}
               </span>
             ))}
         </div>
       </div>
     </div>
   );


  if (type === "tv") return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <div className="space-y-3 text-gray-300">
          <div>
            <span className="text-gray-500">First Aired:</span>{" "}
            {movie.release_date}
          </div>
          <div>
            <span className="text-gray-500">Status:</span> $
            {movie.revenue && movie.revenue.toLocaleString()}
          </div>
          <div>
            <span className="text-gray-500">Network:</span> {movie.runtime} mins
          </div>
          <div>
            <span className="text-gray-500">Creator:</span> {movie.runtime} mins
          </div>
          <div>
            <span className="text-gray-500">Episodes:</span> {movie.runtime}{" "}
            mins
          </div>
          <div>
            <span className="text-gray-500">Seasons:</span> {movie.runtime} mins
          </div>
          <div>
            <span className="text-gray-500">Episode Runtime:</span>{" "}
            {movie.runtime} mins
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Cast</h3>
        <div className="grid gap-4">
          {filteredCast.map((cast, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-700" />
              <span className="text-gray-300">{cast.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {movie.genres &&
            movie.genres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                {GENRES[genre.id]}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
