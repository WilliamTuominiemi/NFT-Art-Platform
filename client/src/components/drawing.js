import {BrowserRouter as Router, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Card, Row, Container } from 'react-bootstrap'
import axios from 'axios'

export default function Drawing() {
    let { id } = useParams();

    const [post, setPost] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/${id}`).then((res) => {
            setPost(res.data)       
        })
    }, [])

    console.log(post)

    return (
        <Container>
            <Row className="justify-content-md-center">
                    <Card className="text-center" style={{ width: '50%', margin: '1%'}}>
                    <Card.Body>
                        <Card.Title>
                            <a href={"/user/"+post.artist_googleId}>
                            <img height="50px" src={post.artist_avatar}/>
                            </a>
                            {post.artist_displayName} drew:
                        </Card.Title>
                        <Card.Img variant="top" src={post.src} />    
                        <Card.Title>{post.likes} ❤️</Card.Title>
                        <Card.Text>
                            owned by 
                            <a href={"/user/"+post.owner_googleId}><img height="25px" src={post.owner_avatar}/></a> {post.owner_displayName}
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </Row>       
        </Container> 
    )
}
