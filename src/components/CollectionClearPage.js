import React from "react";
import { useNavigate } from "react-router-dom";
import './styling.css'

const CollectionClearPage = () => {
    const navigate = useNavigate();

    function clearCollection() {
        // Clear all collected movies from local storage
        localStorage.removeItem("collectedMovies");
        navigate('/collection');
    }

    function justGoBack() {
        navigate('/collection');
    }

    return (
        <div className="promptPage">
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