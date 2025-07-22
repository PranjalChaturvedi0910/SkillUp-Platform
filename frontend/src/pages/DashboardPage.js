import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Box, Heading, Text, Tag, VStack, Spinner, Center, Flex } from '@chakra-ui/react';

const DashboardPage = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Center h="80vh"><Spinner size="xl" color="brand.500" /></Center>;
    if (!user) return <Center h="80vh"><Heading>Could not load your profile.</Heading></Center>;

    return (
        <Center>
            <VStack spacing={6} p={8} borderWidth="1px" borderRadius="lg" boxShadow="md" maxW="lg" w="full" align="stretch">
                <Heading size="xl" color="brand.900">My Profile</Heading>
                <Box>
                    <Heading size="md" mb={2}>Username</Heading>
                    <Text fontSize="lg" color="gray.700">{user.username}</Text>
                </Box>
                <Box>
                    <Heading size="md" mb={2}>My Bio</Heading>
                    <Text color="gray.600">{user.bio}</Text>
                </Box>
                <Box>
                    <Heading size="md" mb={2}>Skills I Teach</Heading>
                    <Flex wrap="wrap" gap={2}>
                        {user.skillsToTeach?.map(skill => <Tag key={skill} size="lg" bg="brand.500" color="white">{skill}</Tag>)}
                    </Flex>
                </Box>
                <Box>
                    <Heading size="md" mb={2}>Skills I'm Learning</Heading>
                    <Flex wrap="wrap" gap={2}>
                        {user.skillsToLearn?.map(skill => <Tag key={skill} size="lg" bg="brand.800" color="white">{skill}</Tag>)}
                    </Flex>
                </Box>
            </VStack>
        </Center>
    );
};

export default DashboardPage;