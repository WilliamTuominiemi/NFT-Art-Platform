import React from 'react'
import { Box } from '@chakra-ui/react'
import MyNavbar from './MyNavbar'

const Layout = ({ children }) => {
  return (
    <>
      <MyNavbar />
      <Box p={8}>{children}</Box>
    </>
  )
}

export default Layout
