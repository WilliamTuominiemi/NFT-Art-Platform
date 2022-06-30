import {BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import axios from 'axios'

import Canvas from './canvas'

export default function Create() {
    return (
        <div>
            <Canvas
                width={700}
                height={500}
            />
        </div>
        
    )
}