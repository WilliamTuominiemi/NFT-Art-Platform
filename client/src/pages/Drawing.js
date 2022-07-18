import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Image } from '@chakra-ui/react'
import useFetch from '../hooks/useFetch'

export default function Drawing() {
  const { id } = useParams()
  const { data: drawing, isError, isLoading } = useFetch(`/drawings/${id}`)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={drawing.src} alt="Drawing" />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <a href={`/user/${drawing.artist._id}`}>
              Artist: {drawing.artist.displayName}
            </a>
            <br />
            <a href={`/user/${drawing.owner._id}`}>
              Owner: {drawing.owner.displayName}
            </a>
          </Box>
        </Box>

        <Box mt="1">{drawing.likes} ❤️</Box>

        <Box>
          <a href={`/drawing/${drawing._id}`}>View</a>
        </Box>
      </Box>
    </Box>
  )
}
