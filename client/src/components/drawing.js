import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

export default function Drawing() {
    let { id } = useParams();

    const [post, setPost] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/${id}`).then((res) => {
            setPost(res.data)       
        })
    }, [])

    return (
        <Container>
            <Row className="justify-content-md-center">
                    <Card className="text-center" style={{ width: '50%', margin: '1%'}}>
                    <Card.Body>
                        <Card.Title>
                            <img height="50px" src={post.artist_avatar}></img>
                            {post.artist_displayName} drew:
                        </Card.Title>
                        <Card.Img variant="top" src={post.src} />    
                        <Card.Text>{post.likes} Likes</Card.Text>
                        <Card.Text>
                            owned by <img height="25px" src={post.owner_avatar}/> {post.owner_displayName}
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </Row>       
        </Container> 
    )
}
