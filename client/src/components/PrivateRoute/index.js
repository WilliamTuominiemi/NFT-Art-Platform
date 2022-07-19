import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext)

  if (!user) return <Navigate to="/" />
  return <>{children}</>
}

export default PrivateRoute
