import React from 'react'
import { Box, Image } from '@chakra-ui/react'

const Drawing = ({ drawing }) => {
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

export default Drawing
