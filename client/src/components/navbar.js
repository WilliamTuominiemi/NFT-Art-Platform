import React, { useEffect, useState } from 'react'
import {  Navbar, Container, Nav } from 'react-bootstrap'

export default function Menu() {
    const [user, setUser] = useState({})

    useEffect(()=>{
        const getUser = fetch('http://localhost:8080/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })

        getUser 
          .then(user => user.json())
          .then(user => {       
            console.log(user)
            setUser(user)       
          })
          .catch((error) => {
            console.error(error)
        })
    }, [])

    function logButton() {
        if(user === 'undefined') {
            return <Nav.Link href="http://localhost:8080/auth/google">Log in</Nav.Link>
        } else {
            return <Nav.Link href="http://localhost:8080/auth/logout">Log out</Nav.Link>
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="/">BayyNet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    {logButton()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}