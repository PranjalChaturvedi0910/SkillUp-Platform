import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Tag, VStack, Spinner, Center, Button, Flex } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
                setProfile(res.data);
            } catch (error) {
                console.error("Could not fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    if (loading) return <Center h="80vh"><Spinner size="xl" color="brand.500" /></Center>;
    if (!profile) return <Center h="80vh"><Heading>Profile not found.</Heading></Center>;

    return (
        <Center>
            <VStack spacing={6} p={8} borderWidth="1px" borderRadius="lg" boxShadow="md" maxW="lg" w="full" align="stretch">
                <Heading size="xl" color="brand.900">{profile.username}'s Profile</Heading>
                <Box>
                    <Heading size="md" mb={2}>Bio</Heading>
                    <Text color="gray.600">{profile.bio}</Text>
                </Box>
                <Box>
                    <Heading size="md" mb={2}>Skills to Teach</Heading>
                    <Flex wrap="wrap" gap={2}>
                        {profile.skillsToTeach.map(skill => <Tag key={skill} size="lg" bg="brand.500" color="white">{skill}</Tag>)}
                    </Flex>
                </Box>
                <Box>
                    <Heading size="md" mb={2}>Skills to Learn</Heading>
                    <Flex wrap="wrap" gap={2}>
                        {profile.skillsToLearn.map(skill => <Tag key={skill} size="lg" bg="brand.800" color="white">{skill}</Tag>)}
                    </Flex>
                </Box>
                {currentUser && currentUser.userId !== profile._id && (
                    <Button as={RouterLink} to={`/chat/${profile._id}`} bg="brand.500" color="white" size="lg" _hover={{ bg: '#C52A73' }}>
                        Chat with {profile.username}
                    </Button>
                )}
            </VStack>
        </Center>
    );
};

export default ProfilePage;