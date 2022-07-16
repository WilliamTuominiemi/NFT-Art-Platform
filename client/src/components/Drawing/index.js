import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Drawing = ({ drawing }) => {
  return (
    <Card className="text-center" style={{ width: '18rem', margin: '1%' }}>
      <Card.Img variant="top" src={drawing.src} />
      <Card.Body>
        <Card.Text>
          <a href={`/user/${drawing.artist._id}`}>
            <img height="50px" src={drawing.artist.image} alt="artist" />
          </a>
          &nbsp;{drawing.artist.displayName}
        </Card.Text>
        <Card.Title>{drawing.likes} ❤️</Card.Title>
        <Button variant="primary" href={`/drawing/${drawing._id}`}>
          View
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Drawing
