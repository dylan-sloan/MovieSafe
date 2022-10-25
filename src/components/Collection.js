import React from 'react'
import { useNavigate } from "react-router-dom";

const Collection = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1 className="heading"> Your Collection </h1>
        <br />
        <button onClick={() => navigate(-1)}>Back to Your List</button>
    </div>
  )
}

export default Collection;