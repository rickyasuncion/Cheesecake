import React from 'react'

const Sidebar = () => {
  return (
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-2">Details</h3>
      <div className="space-y-3 text-gray-300">
        <div>
          <span className="text-gray-500">Release Date:</span> {movieData.releaseDate}
        </div>
        <div>
          <span className="text-gray-500">Revenue:</span> {movieData.revenue}
        </div>
        <div>
          <span className="text-gray-500">Runtime:</span> {movieData.runtime}
        </div>
        <div>
          <span className="text-gray-500">Director:</span> {movieData.director}
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-2">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {movieData.genres.map((genre, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Sidebar