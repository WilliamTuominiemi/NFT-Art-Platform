import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import Drawing from '../components/Drawing'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const { data: drawings, isLoading, isError } = useFetch('/drawings')

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error</div>

  return (
    <Box w="full" display="flex" justifyContent="center">
      <SimpleGrid columns={[1, 2, 4]} spacing={4} w="full" maxW="1500px">
        {drawings && (
          <>
            {drawings.map((drawing) => (
              <Drawing key={drawing._id} drawing={drawing} />
            ))}
          </>
        )}
      </SimpleGrid>
    </Box>
  )
}

export default Home
