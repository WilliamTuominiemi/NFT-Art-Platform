import React, { useRef } from 'react'
import Canvas from '../components/Canvas'

const Create = () => {
  const canvasRef = useRef(null)

  return <Canvas canvasRef={canvasRef} color="#000" />
}

export default Create
