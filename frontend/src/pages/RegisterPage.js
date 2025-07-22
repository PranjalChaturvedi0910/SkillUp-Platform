import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert, AlertIcon, Flex } from '@chakra-ui/react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '', skillsToTeach: '', skillsToLearn: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const payload = {
                ...formData,
                skillsToTeach: formData.skillsToTeach.split(',').map(s => s.trim()).filter(Boolean),
                skillsToLearn: formData.skillsToLearn.split(',').map(s => s.trim()).filter(Boolean),
            };
            const res = await axios.post('http://localhost:5000/api/auth/register', payload);
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <Flex align="center" justify="center" h="calc(100vh - 200px)">
            <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg" w="full">
                <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                    <Heading color="brand.900">Create an Account</Heading>
                    {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                    {message && <Alert status="success"><AlertIcon />{message}</Alert>}
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" name="username" onChange={handleChange} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" name="password" onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Skills you can teach (comma-separated)</FormLabel>
                        <Input type="text" name="skillsToTeach" onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Skills you want to learn (comma-separated)</FormLabel>
                        <Input type="text" name="skillsToLearn" onChange={handleChange} />
                    </FormControl>
                    <Button type="submit" bg="brand.500" color="white" width="full" _hover={{ bg: '#C52A73' }}>Register</Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default RegisterPage;