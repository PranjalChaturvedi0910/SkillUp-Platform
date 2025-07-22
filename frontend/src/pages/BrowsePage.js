import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, SimpleGrid, Card, CardHeader, CardBody, Text, Tag, Center, Spinner, Flex } from '@chakra-ui/react';

const BrowsePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Could not fetch users', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <Center h="80vh"><Spinner size="xl" color="brand.500" /></Center>;

    return (
        <Box>
            <Heading mb={8} textAlign="center" color="brand.900">Browse Community Skills</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {users.map(user => (
                    <Card as={RouterLink} to={`/profile/${user._id}`} key={user._id} _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)' }} transition="all 0.2s">
                        <CardHeader>
                            <Heading size="md" color="brand.900">{user.username}</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text fontWeight="bold" mb={2}>Teaches:</Text>
                            <Flex wrap="wrap" gap={2}>
                                {user.skillsToTeach.length > 0 ? user.skillsToTeach.map(skill => (
                                    <Tag key={skill} bg="brand.500" color="white">{skill}</Tag>
                                )) : <Text fontSize="sm" color="gray.500">None listed</Text>}
                            </Flex>
                        </CardBody>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default BrowsePage;