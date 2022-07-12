import React, { useEffect, useState } from 'react'

import Canvas from './canvas'

import {uploadButton, changeNewColor} from './hooks'

import { BrowserRouter as Router, useParams, Link, useNavigate  } from 'react-router-dom'

import { HuePicker   } from 'react-color'

import { FormGroup, FormControl } from 'react-bootstrap'

export default function Create() {
    let navigate = useNavigate();

    function buttonClick() {
        uploadButton()
        setTimeout(() => {
            navigate('/')
          }, "1000")
    }

    let [color, setColor] = useState([])
    let [thickness, setThickness] = useState([])

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
            <HuePicker color={color} onChange={changeColor}/>
            <FormGroup>
                <FormControl 
                    type='number'
                    name='thickness' 
                    placeholder='thiccness' 
                    defaultValue='5'
                    onChange = { (event) => { console.log(event.target.value) } }
                    min="0" max="50" step="0.5"
                    />
            </FormGroup>
            <button onClick={buttonClick}>UPLOAD</button>
        </div>     
    )
}