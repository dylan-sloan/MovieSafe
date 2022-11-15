import React from 'react'
import { useNavigate } from "react-router-dom";
import './styling.css'

const Collection = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1 className="heading"> Your Collection </h1>
        <div className='movieList'>
          <li>Keep track of the movies you've watched!</li>
          <li>They will show up here after you've watched them.</li>
          <li>Grow your collection!</li>
          <li>COMING SOON</li>
        </div>
        <br />
        <br />
        <button class="button-82-pushable" onClick={()=>navigate(-1)}>
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