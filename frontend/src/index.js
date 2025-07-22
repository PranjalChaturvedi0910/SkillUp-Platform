import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Define the new color palette
const colors = {
  brand: {
    900: '#1A1124', // Dark Purple
    800: '#5A4A6B', // Medium Purple
    700: '#B0A7B7', // Light Purple/Lavender
    500: '#D63384', // Bright Purple/Pink Accent
  },
};

const theme = extendTheme({ colors });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);