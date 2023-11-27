import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './styling.css'
import WatchList from './WatchList';

const Collection = () => {
  const navigate = useNavigate();

  const [collectedMovies, setCollectedMovies] = useState([]);

  useEffect(() => {
    const collectedMovieList = JSON.parse(localStorage.getItem("collectedMovies"))
    if (collectedMovieList) setCollectedMovies(prevCollectedMovies => [...prevCollectedMovies, ...collectedMovieList])
  }, [])

  useEffect(() => {
      localStorage.setItem("collectedMovies", JSON.stringify(collectedMovies))
  }, [collectedMovies])

  function toggleClicked(id) {
    const newCollection = [...collectedMovies]
    const movie = newCollection.find(movie => movie.id === id)
    movie.watched = !movie.watched
    setCollectedMovies(newCollection)
  }
  
  return (
    <div>
        <h1 className="collectionHeading"> Your Collection </h1>
        <div className='totalWatched'>{collectedMovies.length} Movies Watched</div>
        <div className='movieList'>
          {<WatchList className="movieList" movies={collectedMovies} toggleWatched={toggleClicked}></WatchList>}
        </div>
        <br />
        <br />
        <button class="button-82-pushable" onClick={()=>navigate('/prompt')}>
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Clear Collection
            </span>
        </button>
        <button class="button-82-pushable" onClick={()=>navigate('/')}>
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Back to Your List
            </span>
        </button>
    </div>
  )
}

export default Collection;