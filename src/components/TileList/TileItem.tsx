import React from 'react';
import { Stock } from '../../api/stock/data-types';
import { Box, Heading, Text } from '@chakra-ui/react';
interface TileItemProps {
  item: Stock;
}

const TileItem: React.FunctionComponent<TileItemProps> = ({ item }) => (
  <Box
    width={{ base: '100%', sm: '100%', md: '30%', lg: '23%' }}
    height={{ base: '140px', md: '120px' }}
    ml={{ base: 2 }}
    mb={{ base: 4 }}
    mr={{ base: 2 }}
    borderRadius="md"
    boxShadow="md">
    <Heading fontSize="xl">{item.name}</Heading>
    <Text mt={4}>{item.unique_symbol}</Text>
  </Box>
);

export default TileItem;
