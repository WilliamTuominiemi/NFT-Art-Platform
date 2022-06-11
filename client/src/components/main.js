import React, { Component, useEffect, useState } from 'react'
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'
import Drawing from './drawing'

export default function Main() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/`).then((res) => {
            return(
                res.data.map(drawing => {
                    let drawings = posts
                    drawings.push(drawing)
                    setPosts(drawings)
                })
            )        
        })
    })

    console.log(posts)

    return (
        <Container>
            {/* <p>{posts[0]._id}</p> */}
            {posts.map((post) => {
                <h1>post</h1>
            })}
        </Container>
    )
}
