import React, { useEffect, useState } from 'react'

import Canvas from './canvas'

import {uploadButton, changeNewColor, changeThickness} from './hooks'

import { BrowserRouter as Router, useParams, Link, useNavigate  } from 'react-router-dom'

import { ChromePicker   } from 'react-color'

import { FormGroup, FormControl, Button, Card } from 'react-bootstrap'

import "../style.css"

export default function Create() {
    let navigate = useNavigate();

    function buttonClick() {
        uploadButton()
        setTimeout(() => {
            navigate('/')
          }, "1000")
    }

    let [color, setColor] = useState([])

    function changeColor(pickedColor) {
        setColor(pickedColor)
        changeNewColor(color.hex)
    }

    return (
        <div>
            <Canvas
                width={500}
                height={500}
            />
            <br />
            <Card className="controlPanel">
                <center>          
                <ChromePicker  className="chromePicker" color={color} onChange={changeColor}/>
                <FormGroup className="formGroup">
                    <FormControl 
                        type='number'
                        name='thickness' 
                        placeholder='thiccness' 
                        defaultValue='5'
                        onChange = { (event) => { changeThickness(event.target.value) } }
                        min="0" max="50" step="5"
                        />
                </FormGroup>
                <Button className="postButton" variant="primary" onClick={buttonClick}>Post</Button>
                </center>
            </Card>
        </div>     
    )
}