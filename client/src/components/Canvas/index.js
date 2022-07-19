import React, { useEffect } from 'react'
import { useCanvas } from '../../context/canvasContext'

export const Canvas = () => {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, draw } =
    useCanvas()

  useEffect(() => {
    prepareCanvas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
      style={{
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: '1px',
      }}
    />
  )
}

export default Canvas
