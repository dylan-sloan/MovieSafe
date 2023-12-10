import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './styling.css'
import WatchList from './WatchList';

const Collection = () => {
  const navigate = useNavigate();
  const DARK_MODE_KEY = 'darkMode';

  const [collectedMovies, setCollectedMovies] = useState([]);
  const initialDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY)) || false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    const collectedMovieList = JSON.parse(localStorage.getItem("collectedMovies"))
    if (collectedMovieList) setCollectedMovies(prevCollectedMovies => [...prevCollectedMovies, ...collectedMovieList])

    // Load dark mode state from local storage
    const initialDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY)) || false;
    setDarkMode(initialDarkMode);
  }, [])

  useEffect(() => {
    localStorage.setItem("collectedMovies", JSON.stringify(collectedMovies))
  }, [collectedMovies])

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#282828' : '#f2f3f4';

    // Save dark mode state to localStorage whenever it changes
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));

    // Cleanup: reset body background color when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [darkMode]);

  function toggleClicked(id) {
    const newCollection = [...collectedMovies]
    const movie = newCollection.find(movie => movie.id === id)
    movie.watched = !movie.watched
    setCollectedMovies(newCollection)
  }

  function removeMovie(id) {
    const newCollection = collectedMovies.filter((movie) => movie.id !== id);
    setCollectedMovies(newCollection);
  }

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }
  
  return (
    <div>
        <h1 className={`collectionHeading ${darkMode ? 'dark-heading' : 'light-heading'}`}> Your Collection </h1>
        <button className="darkModeButton" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className='totalWatched'>{collectedMovies.length} Movies Watched</div>
        <div className={`movieListContainer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
          {
            <WatchList
              className="movieList"
              movies={collectedMovies}
              toggleWatched={toggleClicked}
              removeMovie={removeMovie}
            >
            </WatchList>
          }
        </div>
        <br />
        <br />
        <button class="button-82-pushable" onClick={()=>navigate('/prompt')}>
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Clear Entire Collection
            </span>
        </button>
        <button class="button-82-pushable" onClick={()=>navigate('/')}>
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Back
            </span>
        </button>
    </div>
  )
}

export default Collection;