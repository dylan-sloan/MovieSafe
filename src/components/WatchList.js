import React from 'react'
import Movie from './Movie'
import './styling.css'

export default function WatchList({ movies, toggleWatched, removeMovie }) {
  //If no movies are in the list then display the message
  if(Object.keys(movies).length === 0) {
    return (
      <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
        }}
      >
        Add a movie to start your list
        <br />
        <br />
      </div>
    )
  }

  return (
    movies.map(movie => {
        return <Movie 
        key={movie.id}
        toggleWatched={toggleWatched}
        removeMovie={removeMovie}
        movie={movie}
        />
    })
  )
}