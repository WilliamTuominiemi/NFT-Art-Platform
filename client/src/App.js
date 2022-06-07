import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css"
import { Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import Main  from "./components/main.component"
import Drawing  from "./components/drawing.component"

export default function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<Main />} />   
        <Route path="/:id" element={<Drawing />} />   
      </Routes>
    </div>
  );
}
