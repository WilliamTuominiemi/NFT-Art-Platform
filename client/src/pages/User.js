import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, SimpleGrid } from '@chakra-ui/react'
import useFetch from '../hooks/useFetch'
import Drawing from '../components/Drawing'

const User = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useFetch(`/users/${id}`)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box>
      <div>
        <h1>
          <img src={user.image} alt="Avatar" />
          &nbsp;{user.displayName}
        </h1>
        <p> Joined on: {user.createdAt}</p>
      </div>
      <br />
      <h2>Owned drawings:</h2>
      <SimpleGrid columns={2} spacing={10}>
        {user.drawings.map((drawing) => (
          <Drawing key={drawing._id} drawing={drawing} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default User
