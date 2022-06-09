import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { Component } from 'react'
import { Card, Button, Row, Container } from 'react-bootstrap'
import axios from 'axios'

export default function Drawing() {
    let { id } = useParams();

    return (
        <Card>
            <Card.Text>ID: {id}</Card.Text>
        </Card>
    )

}
