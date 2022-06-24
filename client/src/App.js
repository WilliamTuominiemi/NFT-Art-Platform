import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import "./App.css"
import { Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar"
import Main  from "./components/main"
import Drawing  from "./components/drawing"
import User  from "./components/user"
import Profile  from "./components/profile"
import Create  from "./components/create"

export default function App() {
  return (
    <div>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" element={<Main />} />   
        <Route path="/profile" element={<Profile />} />  
        <Route path="/create" element={<Create />} />   
        <Route path="/user/:id" element={<User />} />   
        <Route path=":id" element={<Drawing />} />   
      </Routes>
    </div>
  );
}
