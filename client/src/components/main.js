import React, { Component, useEffect, useState } from 'react'
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'
import Drawing from './drawing'

const Post = (props) => {
    return (
        <Card className="text-center" style={{ width: '18rem', margin: '1%'}}>
        <Card.Img variant="top" src={props.post.src} />
        <Card.Body>
            <Card.Title>
                <img height="50px" src={props.post.artist_avatar}></img>
                {props.post.artist_displayName}
            </Card.Title>
            <Card.Text>{props.post.likes} Likes</Card.Text>
            <Button variant="primary" href={props.post._id}>View</Button>
        </Card.Body>
        </Card>
    )
}


export default function Main() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/`).then((res) => {
            setPosts(res.data)       
        })
    }, [])

    return (
        <Container>
            <Row xs={1} md={2} className="g-4">
                {posts.map((post) => (
                    <Post post={post} key={post._id} />             
                ))}  
            </Row> 
        </Container>
    )
}