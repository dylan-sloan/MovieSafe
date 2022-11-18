import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WatchList from "./WatchList";
import { v4 as uuidv4 } from 'uuid'; // Allows for random key generation
import './styling.css'

//TODO Set up Google Firebase as backend to scale

const Home = () => {
    const navigate = useNavigate();
    const LOCAL_STORAGE_KEY = 'watchList.movies';

    const [movies, setMovies] = useState([]);
    const movieNameRef = useRef();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedMovies) setMovies(prevMovies => [...prevMovies, ...storedMovies])
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

    function toggleWatched(id) {
        const newMovies = [...movies]
        const movie = newMovies.find(movie => movie.id === id)
        movie.watched = !movie.watched
        setMovies(newMovies)
    }

    function addMovie(e) {
        const name = movieNameRef.current.value
        if(name === '') return
        setMovies(prevMovies => {
        return [...prevMovies, { id: uuidv4(), name: name, watched: false}]
        })
        movieNameRef.current.value = null
    }

    function handleClearList() {
        const newMovies = movies.filter(movie => !movie.watched)
        const watchedMovies = movies.filter(movie => movie.watched)
        // Checks if movies are being cleared and adds them to collection
        localStorage.setItem("collectedMovies", JSON.stringify(watchedMovies))
        //addToCollection(watchedMovies)
        setMovies(newMovies)
    }

    //Prevents overwriting collection every time
    /*
    function addToCollection(watchedMovies) {
        // Parse any JSON previously stored in collectedMovies
        var existingEntries = JSON.parse(localStorage.getItem("collectedMovies"));
        if(existingEntries == null) existingEntries = [];
        var entry = watchedMovies;
        localStorage.setItem("entry", JSON.stringify(entry));
        // Save collectedMovies back to local storage
        existingEntries.push(entry);
        localStorage.setItem("collectedMovies", JSON.stringify(existingEntries));
    };
    */

    return (
        <>
        <div id="centerwrap">
        <h1 className="heading"> MovieSafe </h1>
        <WatchList className="movieList" movies={movies} toggleWatched={toggleWatched}/>
        <input className="movieList" ref={movieNameRef} type="text" placeholder="Enter movie name" />
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
                Clear Watched to Collection
            </span>
        </button>
        <div className="movieList">{movies.filter(movie => !movie.watched).length}/{movies.filter(movie => movie.watched).length + movies.filter(movie => !movie.watched).length} left to watch</div>
        </div>
        </>
    )
}

export default Home;