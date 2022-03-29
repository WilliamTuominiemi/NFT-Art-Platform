import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css"
import { Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component"
import Main  from "./components/main.component"


export default function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<Main />} />   
      </Routes>
    </div>
  );
}
