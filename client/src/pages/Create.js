import React from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { useCanvas } from '../context/canvasContext'
import Canvas from '../components/Canvas'

const Create = () => {
  const { clearCanvas, canvasRef } = useCanvas()

  const createDrawing = async () => {
    const image = await canvasRef.current.toDataURL('image/png', 1)

    await fetch(`${process.env.REACT_APP_API_URL}/drawings`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ src: image }),
    })

    window.location.href = '/'
  }

  return (
    <>
      <Canvas />
      <Stack direction="row" spacing={4} align="center">
        <Button
          onClick={clearCanvas}
          variant="outline"
          colorScheme="purple"
          my={4}
        >
          Clear
        </Button>

        <Button
          onClick={createDrawing}
          variant="solid"
          colorScheme="purple"
          my={4}
        >
          Create
        </Button>
      </Stack>
    </>
  )
}

export default Create
