import React from 'react'

import Canvas from './canvas'

import {uploadButton} from './hooks'

import { BrowserRouter as Router, useParams, Link, useNavigate  } from 'react-router-dom'

export default function Create() {
    let navigate = useNavigate();

    function buttonClick() {
        uploadButton()
        setTimeout(() => {
            navigate('/')
          }, "1000")
    }

    return (
        <div>
            <Canvas
                width={500}
                height={500}
            />
            <br />
            <button onClick={buttonClick}>UPLOAD</button>
        </div>     
    )
}