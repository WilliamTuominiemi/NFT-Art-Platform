import React from 'react'
import useFetch from '../hooks/useFetch'

export const UserContext = React.createContext({ user: null, isAuth: false })

export const UserProvider = ({ children }) => {
  const { data: currentUser, loading, isError } = useFetch('/users/me')

  if (loading) return <div>Loading...</div>

  return (
    <UserContext.Provider value={{ user: currentUser, isAuth: !isError }}>
      {children}
    </UserContext.Provider>
  )
}
