import React, { useEffect } from 'react'

const Canvas = ({ canvasRef, color }) => {
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.fillStyle = color
  }, [canvasRef, color])

  return (
    <canvas
      ref={canvasRef}
      height="500px"
      width="500px"
      style={{
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: '1px',
      }}
    >
      Canvas
    </canvas>
  )
}

export default Canvas
