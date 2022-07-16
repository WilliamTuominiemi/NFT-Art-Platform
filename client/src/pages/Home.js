import React from 'react'
import { Row, Container } from 'react-bootstrap'
import Drawing from '../components/Drawing'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const { data: drawings, isLoading, isError } = useFetch('/drawings')

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {drawings && (
          <>
            {drawings.map((drawing) => (
              <Drawing key={drawing._id} drawing={drawing} />
            ))}
          </>
        )}
      </Row>
    </Container>
  )
}

export default Home
