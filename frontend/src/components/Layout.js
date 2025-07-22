import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bg="gray.50">
      <Navbar />
      <Container as="main" maxW="container.xl" flex="1" py={8}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;