import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Collection from "./components/Collection";
import CollectionClearPage from "./components/CollectionClearPage";
import Home from "./components/Home";

//TODO Set up Google Firebase as backend to scale

function App() {

  return (
      <>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </head>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/collection" element={<Collection/>}/>
            <Route exact path="/prompt" element={<CollectionClearPage/>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App;
