import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Drawing from '../components/Drawing'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const { data: drawings, isLoading, isError } = useFetch('/drawings')

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <SimpleGrid columns={2} spacing={10}>
      {drawings && (
        <>
          {drawings.map((drawing) => (
            <Drawing key={drawing._id} drawing={drawing} />
          ))}
        </>
      )}
    </SimpleGrid>
  )
}

export default Home
