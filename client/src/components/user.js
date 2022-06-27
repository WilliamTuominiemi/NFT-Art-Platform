import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams, Link } from 'react-router-dom'
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'

const Post = (props) => {
    return (
        <Card className="text-center" style={{ width: '18rem', margin: '1%' }}>
            <Card.Img variant="top" src={props.post.src} />
            <Card.Body>
                <Card.Text>
                    <img height="50px" src={props.post.artist_avatar} alt={props.post.artist_displayName}></img>
                    &nbsp;{props.post.artist_displayName}
                </Card.Text>
                <Card.Title>{props.post.likes} ❤️</Card.Title>
                <Link to={'/' + props.post._id}>
                    <Button variant="primary">View</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default function Main() {
    let { id } = useParams()

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/drawings/${id}`).then((res) => {
            setPosts(res.data)
        })

        axios.get(`http://localhost:8080/user/${id}`).then((res) => {
            setUser(res.data)
        })
    }, [])

    return (
        <Container>
            <div>
                <h1>
                    <img src={user.image} alt={id} />
                    &nbsp;{user.displayName}
                </h1>
                <p> Joined on: {user.createdAt}</p>
            </div>
            <br />
            <h2>Owned drawings:</h2>
            <Row xs={1} md={2} className="g-4">
                {posts.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </Row>
        </Container>
    )
}
