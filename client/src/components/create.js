import React, { useEffect, useState } from 'react'

import Canvas from './canvas'

import {uploadButton} from './hooks'

import { BrowserRouter as Router, useParams, Link, useNavigate  } from 'react-router-dom'

import { HuePicker   } from 'react-color'

import {changeNewColor} from './hooks'

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
            <HuePicker color={color} onChange={changeColor}/>
            <button onClick={buttonClick}>UPLOAD</button>
        </div>     
    )
}