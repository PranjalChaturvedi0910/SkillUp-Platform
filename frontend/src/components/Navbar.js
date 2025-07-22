import React, { useContext } from 'react';
import { Box, Flex, Button, Heading, Spacer, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <Box bg="brand.900" px={8} py={4} boxShadow="sm" position="sticky" top="0" zIndex="1000">
            <Flex align="center">
                <Heading as={RouterLink} to="/" size="md" color="brand.500">SkillUp</Heading>
                <Spacer />
                <Box>
                    <ChakraLink as={RouterLink} to="/browse" mr={6} fontWeight="medium" color="brand.700" _hover={{ color: 'white' }}>Browse</ChakraLink>
                    {isAuthenticated ? (
                        <>
                            <ChakraLink as={RouterLink} to="/dashboard" mr={6} fontWeight="medium" color="brand.700" _hover={{ color: 'white' }}>My Profile</ChakraLink>
                            <Button colorScheme="brand" variant="outline" onClick={logout} _hover={{ bg: 'brand.500', color: 'white' }}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button as={RouterLink} to="/login" colorScheme="brand" variant="ghost" mr={2} _hover={{ bg: 'brand.800' }}>Login</Button>
                            <Button as={RouterLink} to="/register" colorScheme="brand" bg="brand.500" color="white" _hover={{ bg: '#C52A73' }}>Sign Up</Button>
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;