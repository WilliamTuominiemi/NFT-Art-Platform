import React from 'react'
import useFetch from '../hooks/useFetch'

export const UserContext = React.createContext({ user: null, isAuth: false })

export const UserProvider = ({ children }) => {
  const { data: user, loading } = useFetch('/users/me')

  if (loading) return <div>Loading...</div>

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
