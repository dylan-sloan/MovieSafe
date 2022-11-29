import React from 'react'
import './styling.css'

export default function Movie({ movie, toggleWatched }) {
    function handleMovieClick() {
        toggleWatched(movie.id)
    }

    // Concatenate the search term url for each movie
    let baseGoogle = 'http://www.google.com/search?q=';
    let url = baseGoogle.concat(movie.name, " movie");
  
    return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <label id='enlarged'>
            <input id='enlarged' type="checkbox" checked={movie.watched} onChange={handleMovieClick} />
            <a href={url} target='_blank' rel="noopener noreferrer">{movie.name}</a>
        </label>
    </div>
  )
}
