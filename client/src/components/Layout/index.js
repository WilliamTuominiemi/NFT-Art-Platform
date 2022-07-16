import React from 'react'
import MyNavbar from './MyNavbar'

const Layout = ({ children }) => {
  return (
    <>
      <MyNavbar />
      <br />
      <main>{children}</main>
    </>
  )
}

export default Layout
