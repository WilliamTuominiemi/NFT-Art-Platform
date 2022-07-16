import React, { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { UserContext } from '../../context/userContext'

const MyNavbar = () => {
  const { user, isAuth } = useContext(UserContext)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">BayyNet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href={user ? `/user/${user._id}` : '/login'}>
              Profile
            </Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
            {isAuth ? (
              <Nav.Link href={`${process.env.REACT_APP_API_URL}/auth/logout`}>
                Log out
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Log in</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
