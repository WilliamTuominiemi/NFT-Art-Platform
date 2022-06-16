import React, { Component, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom';
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'
import Drawing from './drawing'

const Post = (props) => {
    return (
        <Card className="text-center" style={{ width: '18rem', margin: '1%'}}>
        <Card.Img variant="top" src={props.post.src} />
        <Card.Body>
            <Card.Text>
                <img height="50px" src={props.post.artist_avatar}></img>
                &nbsp;{props.post.artist_displayName}
            </Card.Text>
            <Card.Title>{props.post.likes} ❤️</Card.Title>
            <Link to={"/"+props.post._id}>
                <Button variant="primary">View</Button>
            </Link>
        </Card.Body>
        </Card>
    )
}


export default function Main() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=>{
        console.log("get user")
        axios.get(`http://localhost:8080/users/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        }).then((res) => {
            console.log(res.data) 
        })
    }, [])

    return (
        <h1>hello</h1>
        // <Container>
        //     <h1>{id} owns:</h1>
        //     <Row xs={1} md={2} className="g-4">
        //         {posts.map((post) => (
        //             <Post post={post} key={post._id} />             
        //         ))}  
        //     </Row> 
        // </Container>
    )
}
