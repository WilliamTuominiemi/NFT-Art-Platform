import React, { useContext } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'
import { UserContext } from '../../context/userContext'
import navLinks from './navLinks'

const MyNavbar = () => {
  const { user } = useContext(UserContext)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const navBarBg = useColorModeValue('gray.100', 'gray.900')
  const linkHoverBg = useColorModeValue('gray.200', 'gray.800')

  return (
    <Box bg={navBarBg} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          icon={isOpen ? <FiX size={24} /> : <FiMenu size={20} />}
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          bg={navBarBg}
          _hover={{
            bg: linkHoverBg,
          }}
        />

        <HStack spacing={8} alignItems="center">
          <Box>Bayynet</Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: linkHoverBg,
                }}
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems="center">
          <IconButton
            onClick={toggleColorMode}
            mr={4}
            rounded="full"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            bg={navBarBg}
            _hover={{
              bg: linkHoverBg,
            }}
          />

          {user ? (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" minW={0}>
                <Avatar size="sm" src={user.image} />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href={`/user/${user._id}`}>
                  Profile
                </MenuItem>
                <MenuItem as="a" href="/settings">
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  as="a"
                  href={`${process.env.REACT_APP_API_URL}/auth/logout`}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              colorScheme="purple"
              variant="solid"
              size="sm"
              onClick={() => {
                window.open(
                  `${process.env.REACT_APP_API_URL}/auth/google`,
                  '_self'
                )
              }}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: linkHoverBg,
                }}
                href={link.path}
              >
                {link.name}
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default MyNavbar
