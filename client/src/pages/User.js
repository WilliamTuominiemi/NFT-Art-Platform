import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Container } from 'react-bootstrap'
import useFetch from '../hooks/useFetch'
import Drawing from '../components/Drawing'

const User = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useFetch(`/users/${id}`)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Container>
      <div>
        <h1>
          <img src={user.image} alt="Avatar" />
          &nbsp;{user.displayName}
        </h1>
        <p> Joined on: {user.createdAt}</p>
      </div>
      <br />
      <h2>Owned drawings:</h2>
      <Row xs={1} md={2} className="g-4">
        {user.drawings.map((drawing) => (
          <Drawing key={drawing._id} drawing={drawing} />
        ))}
      </Row>
    </Container>
  )
}

export default User
