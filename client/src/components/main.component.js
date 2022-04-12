import React, { Component } from 'react'
import { Card, Button, Row } from 'react-bootstrap'
import axios from 'axios'

const Post = (props) => (
    <Card className="text-center" style={{ width: '18rem'}}>
        <Card.Img variant="top" src={props.post.src} />
        <Card.Body>
            <Card.Title>
                <img height="50px" src={props.post.artist_avatar}></img>
                {props.post.artist_displayName}
            </Card.Title>
            <Card.Text>{props.post.likes} Likes</Card.Text>
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
        return <Row xs={1} md={2} className="g-4">
            {this.drawingList()}
            </Row>

    }
}
