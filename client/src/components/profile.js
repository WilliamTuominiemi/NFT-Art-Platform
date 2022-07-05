import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Card, Button, Row, Container } from 'react-bootstrap'

const Post = (props) => {
    return (
        <Card className="text-center" style={{ width: '18rem', margin: '1%' }}>
            <Card.Img variant="top" src={props.post.src} />
            <Card.Body>
                <Card.Text>
                    <img height="50px" src={props.post.artist_avatar} />
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
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = fetch('http://localhost:8080/user/', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })

        const getPosts = (id) =>
            fetch(`http://localhost:8080/drawings/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                },
            })

        getUser
            .then((user) => user.json())
            .then((user) => {
                getPosts(user.googleId)
                    .then((data) => data.json())
                    .then((data) => {
                        setPosts(data)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                setUser(user)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <Container>
            <div>
                <h1>
                    <img src={user.image} />
                    &nbsp;{user.displayName}
                </h1>
                <p> Joined on: {user.createdAt}</p>
                <Link to={'/create'}>
                    <Button variant="primary">Paint A Drawing</Button>
                </Link>
            </div>
            <h2>Drawings that you own:</h2>
            <Row xs={1} md={2} className="g-4">
                {posts.map((post) => (
                    <Post post={post} key={post._id} />
                ))}
            </Row>
        </Container>
    )
}
