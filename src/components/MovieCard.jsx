import React from 'react'

const MovieCard = ({id, imageUrl, media_type, title, name, poster_path}) => {
  return (
    <div key={id} className="movie-card space-y-2">
    <img
      src={
        imageUrl ||
        `https://image.tmdb.org/t/p/w500/${poster_path}`
      }
      alt={media_type === "movie" ? title : name}
    />
    <h3>{media_type === "movie" ? title : name}</h3>
  </div>
  )
}

export default MovieCard