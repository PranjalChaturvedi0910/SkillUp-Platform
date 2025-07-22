import React from 'react';
import { Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxW="container.lg" centerContent py={{ base: '12', md: '24' }}>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size={{ base: '2xl', md: '4xl' }} color="brand.900">
          Learn a Skill, Share a Skill
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl" color="brand.800">
          Our platform connects people who want to learn with those who are eager to teach. Join our community to exchange knowledge, grow your skills, and meet new people.
        </Text>
        <Button as={RouterLink} to="/browse" bg="brand.500" color="white" size="lg" px={8} _hover={{ bg: '#C52A73' }}>
          Browse Skills Now
        </Button>
      </VStack>
    </Container>
  );
};

export default HomePage;