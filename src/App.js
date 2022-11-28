import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Collection from "./components/Collection";
import Home from "./components/Home";

//TODO Set up Google Firebase as backend to scale

function App() {

  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/collection" element={<Collection/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;
