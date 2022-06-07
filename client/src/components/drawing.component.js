import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'

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

    render() {
        return (
            <Card>
                <Card.Text>Drawing</Card.Text>
            </Card>
        )
    }
}
