import React from 'react'
import Movie from './Movie'

export default function WatchList({ movies, toggleWatched }) {
  return (
    movies.map(movie => {
        return <Movie key={movie.id} toggleWatched={toggleWatched} movie={movie} />
    })
  )
}
