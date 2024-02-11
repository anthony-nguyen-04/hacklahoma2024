import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Play from "./Components/Play";
import Times from "./Components/Times";
import Forum from "./Components/Forum";

import Menu from "./Components/Menu";

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
       
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="play" element={<Play />} />
          <Route path="times" element={<Times />} />
          <Route path="forum" element={<Forum />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
