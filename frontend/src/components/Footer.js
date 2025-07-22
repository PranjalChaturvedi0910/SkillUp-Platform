import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box as="footer" py={6} px={8} bg="brand.800" textAlign="center" color="brand.700">
      <Text fontSize="sm">&copy; {currentYear} SkillUp Platform. All Rights Reserved.</Text>
    </Box>
  );
};

export default Footer;