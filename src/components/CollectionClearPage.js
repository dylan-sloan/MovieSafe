import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styling.css'

const CollectionClearPage = () => {
    const navigate = useNavigate();
    const DARK_MODE_KEY = 'darkMode';

    const initialDarkMode = JSON.parse(localStorage.getItem(DARK_MODE_KEY)) || false;
    // Not modified from this page so don't need setDarkMode
    const [darkMode] = useState(initialDarkMode);

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

    function clearCollection() {
        // Clear all collected movies from local storage
        localStorage.removeItem("collectedMovies");
        navigate('/collection');
    }

    function justGoBack() {
        navigate('/collection');
    }

    return (
        <div className={`promptPage ${darkMode ? 'promptPage-dark' : 'promptPage-light'}`}>
            <h2> Are you sure you want to clear your collection? </h2>
            <button class="button-82-pushable" onClick={clearCollection}>
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    Yes
                </span>
            </button>
            <button class="button-82-pushable" onClick={justGoBack}>
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    No
                </span>
            </button>
        </div>
    )
}

export default CollectionClearPage;