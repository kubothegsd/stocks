import React from 'react';
import {
  Heading,
  Flex,
  Spacer,
  useColorMode,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="100%" p={4} borderBottomWidth="1px">
      <Flex>
        <Heading>Stocks</Heading>
        <Spacer />
        <IconButton
          icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
          variant="outline"
          aria-label="Toggle theme"
        />
      </Flex>
    </Box>
  );
};

export default ThemeToggle;
