import React from 'react'
import './styling.css'

export default function Movie({ movie, toggleWatched, removeMovie }) {
    function handleMovieClick() {
        toggleWatched(movie.id)
    }

    function handleRemoveClick() {
        try {
            removeMovie(movie.id);
        } catch (error) {
            console.log(error);
        }
    }

    // Concatenate the search term url for each movie
    let baseGoogle = 'http://www.google.com/search?q=';
    let url = baseGoogle.concat(movie.name, " movie");
  
    return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <label id='enlarged'>
            <input 
            id='enlarged' 
            type="checkbox" 
            checked={movie.watched} 
            onChange={handleMovieClick} 
            />
            <a 
            href={url} 
            target='_blank' 
            rel="noopener noreferrer">
                {movie.name}
            </a>
            <button
                onClick={handleRemoveClick}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '10px'
                }}
            >
                X
            </button>
        </label>
    </div>
  )
}