import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container, Row } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'

export default function Drawing() {
  const { id } = useParams()
  const { data: drawing, isError, isLoading } = useFetch(`/drawings/${id}`)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Card className="text-center" style={{ width: '50%', margin: '1%' }}>
          <Card.Body>
            <Card.Title>
              <a href={`/user/${drawing.artist._id}`}>
                <img height="50px" src={drawing.artist.image} alt="artist" />
              </a>
              {drawing.artist.displayName} drew:
            </Card.Title>
            <Card.Img variant="top" src={drawing.src} />
            <Card.Title>{drawing.likes} ❤️</Card.Title>
            <Card.Text>
              owned by
              <a href={`/user/${drawing.owner._id}`}>
                <img height="25px" src={drawing.owner.image} alt="owner" />
              </a>{' '}
              {drawing.owner.displayName}
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}
