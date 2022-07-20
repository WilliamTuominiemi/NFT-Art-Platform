import React from 'react'
import {
  Box,
  Image,
  useColorModeValue,
  Text,
  Button,
  Stack,
  Avatar,
  AspectRatio,
} from '@chakra-ui/react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import kFormatter from '../../utils/kFormatter'
import dateFormatter from '../../utils/dateFormatter'

const Drawing = ({ drawing }) => {
  const [isLiked, setIsLiked] = React.useState(false)

  return (
    <Box
      borderWidth="1px"
      rounded="xl"
      shadow="lg"
      _hover={{
        boxShadow: 'xl',
      }}
    >
      <AspectRatio ratio={1}>
        <Image
          src={drawing.src}
          roundedTop="xl"
          borderBottom="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          onClick={() => (window.location.href = `/drawings/${drawing.id}`)}
          _hover={{ cursor: 'pointer', roundedBottom: 'xl' }}
        />
      </AspectRatio>
      <Box p="4">
        <Stack
          direction="row"
          spacing={3}
          align="center"
          onClick={() => (window.location.href = `/user/${drawing.artist._id}`)}
          _hover={{ cursor: 'pointer' }}
        >
          <Avatar src={drawing.artist.image} size="sm" />
          <Stack direction="column" spacing={0} fontSize="sm">
            <Text fontWeight={600}>{drawing.artist.displayName}</Text>
            <Text color="gray.500">{dateFormatter(drawing.createdAt)}</Text>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          align="center"
          justifyContent="space-between"
          mt={4}
        >
          <Button
            colorScheme="red"
            size="sm"
            variant="ghost"
            rounded="full"
            leftIcon={isLiked ? <BsHeartFill /> : <BsHeart />}
            onClick={() => setIsLiked(!isLiked)}
          >
            {kFormatter(Number(drawing.likes))}
          </Button>
          <Text
            fontSize="xs"
            textAlign="right"
            color="gray.500"
            onClick={() =>
              (window.location.href = `/user/${drawing.owner._id}`)
            }
            _hover={{
              cursor: 'pointer',
              color: useColorModeValue('black', 'gray.400'),
            }}
          >
            {drawing.owner.displayName} (Owner)
          </Text>
        </Stack>
      </Box>
    </Box>
  )
}

export default Drawing
