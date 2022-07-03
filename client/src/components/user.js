import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, useParams, Link, useNavigate  } from 'react-router-dom'
import { Card, Button, Row, Container } from 'react-bootstrap'

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
    const navigate = useNavigate();

    let { id } = useParams()

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        console.log('get user')

        const getUser = fetch(`http://localhost:8080/user/${id}`, {
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
                if(user === 'this') navigate('/profile')
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
