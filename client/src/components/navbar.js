import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'

export default function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="#home">BayyNet</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link href="http://localhost:8080/auth/google">Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}