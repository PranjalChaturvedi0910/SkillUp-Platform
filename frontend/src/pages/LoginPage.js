import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, Flex } from '@chakra-ui/react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <Flex align="center" justify="center" h="calc(100vh - 200px)">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" w="full">
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                    <Heading color="brand.900">Login</Heading>
                    {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button type="submit" bg="brand.500" color="white" width="full" _hover={{ bg: '#C52A73' }}>Login</Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default LoginPage;