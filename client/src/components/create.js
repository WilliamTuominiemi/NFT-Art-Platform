import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

export default function Create() {
    return (
        <div className="capture" id="canvasDiv">
            <canvas className="canvas" id="canvas" height="500px" width="500px"></canvas>
        </div>
    )
}
