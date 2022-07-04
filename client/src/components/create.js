import React from 'react'

import Canvas from './canvas'

import {uploadButton} from './hooks'

export default function Create() {
    return (
        <div>
            <Canvas
                width={500}
                height={500}
            />
            <br />
            <button onClick={uploadButton}>UPLOAD</button>
        </div>     
    )
}