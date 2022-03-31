import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

const Post = (props) => (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.post.src} />
        <Card.Body>
            <Card.Title>Owned by: ***</Card.Title>
            <Card.Text>420 Likes</Card.Text>
            <Button variant="primary">View</Button>
        </Card.Body>
    </Card>
)

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = { drawings: [] }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/`).then((res) => {
            this.setState({ drawings: res.data })
            // console.log(this.state.drawings)
        })
    }

    drawingList() {
        return this.state.drawings.map((currentdrawing) => {
            console.log(currentdrawing)
            return <Post post={currentdrawing} key={currentdrawing._id} />
        })
    }

    render() {
        return <div>{this.drawingList()}</div>
    }
}
