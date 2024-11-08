import React from 'react'

const Similiar = (similarMovies) => {
  return (
    <div className="mt-16">
    <h2 className="text-2xl font-semibold mb-6">Similar Movies</h2>
    <div className="grid grid-cols-5 gap-6">
      {similarMovies.map((movie, index) => (
        <div key={index} className="space-y-2">
          <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src="/api/placeholder/300/450" 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium">{movie.title}</h3>
          <p className="text-sm text-gray-400">{movie.genre}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Similiar