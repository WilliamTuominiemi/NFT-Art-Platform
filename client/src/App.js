import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/userContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import User from './pages/User'
import Drawing from './pages/Drawing'
import Create from './pages/Create'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <UserProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/drawing/:id" element={<Drawing />} />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <Create />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Layout>
    </UserProvider>
  )
}

export default App
