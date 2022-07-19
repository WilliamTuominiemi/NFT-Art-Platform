import React from 'react'
import useFetch from '../hooks/useFetch'

export const UserContext = React.createContext({ user: null })

export const UserProvider = ({ children }) => {
  const { data: user, isLoading } = useFetch('/users/me')

  if (isLoading) return <div>Loading...</div>

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}
