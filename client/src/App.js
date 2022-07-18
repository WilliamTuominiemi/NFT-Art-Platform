import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserProvider } from './context/userContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Home from './pages/Home'
import Drawing from './pages/Drawing'
import Create from './pages/Create'
import User from './pages/User'

const App = () => {
  return (
    <ChakraProvider>
      <UserProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
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
    </ChakraProvider>
  )
}

export default App
