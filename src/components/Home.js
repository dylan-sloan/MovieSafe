import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WatchList from "./WatchList";
import { v4 as uuidv4 } from 'uuid'; // Allows for random key generation
import './styling.css'

const Home = () => {
    const navigate = useNavigate();
    const LOCAL_STORAGE_KEY = 'watchList.movies';
    const DARK_MODE_KEY = 'darkMode';

    const [movies, setMovies] = useState([]);

    const initialDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY)) || false;
    const [darkMode, setDarkMode] = useState(initialDarkMode);
    const movieNameRef = useRef();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedMovies) {
            setMovies(prevMovies => [...prevMovies, ...storedMovies])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies))
    }, [movies])

    //Allow for enter key to add a movie to the list
    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Enter') {
            event.preventDefault();
    
            // 👇️ add the movie
            addMovie();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        // Update body background color if dark mode
        document.body.style.backgroundColor = darkMode ? '#282828' : '#f2f3f4';

        // Save dark mode state to localStorage whenever it changes
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));

        // Cleanup: reset body background color when component unmounts
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [darkMode]);

    function toggleWatched(id) {
        const newMovies = [...movies]
        const movie = newMovies.find(movie => movie.id === id)
        movie.watched = !movie.watched
        setMovies(newMovies)
    }

    function addMovie(e) {
        const name = movieNameRef.current.value
        if(name === '') {
            return
        }
        setMovies(prevMovies => {
            return [...prevMovies, { id: uuidv4(), name: name, watched: false}]
        })
        movieNameRef.current.value = null
    }

    function removeMovie(id) {
        const newMovies = movies.filter((movie) => movie.id !== id);
        setMovies(newMovies);
    }

    function handleClearList() {
        const newMovies = movies.filter(movie => !movie.watched);
        const watchedMovies = movies.filter(movie => movie.watched);
    
        // Get existing collectedMovies from local storage
        const existingCollectedMovies = JSON.parse(localStorage.getItem("collectedMovies")) || [];
    
        // Concatenate the new watched movies with the existing collection
        const updatedCollectedMovies = [...existingCollectedMovies, ...watchedMovies];
    
        // Update local storage with the updated collection
        localStorage.setItem("collectedMovies", JSON.stringify(updatedCollectedMovies));
    
        // Update state with the remaining unwatched movies
        setMovies(newMovies);
    }

    function toggleDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode);
    }

    return (
        <>
            <h1 className={`heading ${darkMode ? 'dark-heading' : 'light-heading'}`}> MovieSafe </h1>
            <button className="darkModeButton" onClick={toggleDarkMode}>
                Toggle Dark Mode
            </button>
            <div className={`movieListContainer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
                <WatchList
                    className="movieList"
                    movies={movies}
                    toggleWatched={toggleWatched}
                    removeMovie={removeMovie}
                />
            </div>
            <div className={`bottomContainer ${darkMode ? 'dark-bottom' : 'light-bottom'}`}>
                <input 
                    className={`${darkMode ? 'inputField-dark' : 'inputField-light'}`}
                    ref={movieNameRef} 
                    type="text" 
                    placeholder="Enter movie name"
                />
                {/* Add the buttons */}
                <button class="button-82-pushable" onClick={addMovie}>
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Add Movie
                    </span>
                </button>
                <button class="button-82-pushable" onClick={()=>navigate("/collection")}>
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Your Collection
                    </span>
                </button>
                <button class="button-82-pushable" onClick={handleClearList}>
                    <span class="button-82-shadow"></span>
                    <span class="button-82-edge"></span>
                    <span class="button-82-front text">
                        Move Watched → Collection
                    </span>
                </button>
                <div className="movieList">{movies.filter(movie => !movie.watched).length}/{movies.filter(movie => movie.watched).length + movies.filter(movie => !movie.watched).length} left to watch</div>
            </div>
        </>
    )
}

export default Home;