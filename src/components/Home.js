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
        setMovies(newMovies)
    }

    return (
        <>
        <div id="centerwrap">
        <h1 className="heading"> MovieSafe </h1>
        <WatchList className="movieList" movies={movies} toggleWatched={toggleWatched}/>
        <input className="movieList" ref={movieNameRef} type="text" />
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
                Clear Watched
            </span>
        </button>
        <div className="movieList">{movies.filter(movie => !movie.watched).length}/{movies.filter(movie => movie.watched).length + movies.filter(movie => !movie.watched).length} left to watch</div>
        </div>
        </>
    )
}

export default Home;