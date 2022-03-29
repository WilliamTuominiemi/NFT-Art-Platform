import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'

export default class Main extends Component {
    state = {
        data: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/`).then((res) => {
            this.setState({ data: res.data })
            console.log(res.data)
        })
    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.data} />
                <Card.Body>
                    <Card.Title>Owned by: ***</Card.Title>
                    <Card.Text>420 Likes</Card.Text>
                    <Button variant="primary">View</Button>
                </Card.Body>
            </Card>
        )
    }
}
