import React from 'react';
import { Stock } from '../../api/stock/data-types';
import { Box, Heading, Text } from '@chakra-ui/react';
import ScoreRadarChart from './ScoreRadarChart';
interface TileItemProps {
  item: Stock;
}

const TileItem: React.FunctionComponent<TileItemProps> = ({ item }) => (
  <Box
    width={{ base: '100%', sm: '46%', md: '30%', lg: '23%' }}
    ml={{ base: 0, sm: 2 }}
    mb={{ base: 4 }}
    mr={{ base: 0, sm: 2 }}
    borderWidth="1px"
    borderRadius="lg"
    borderColor="gray.300"
    overflow="hidden">
    <Box borderBottomWidth="1px" borderColor="gray.300" p={{ base: 0, lg: 4 }}>
      <ScoreRadarChart score={item.score} />
    </Box>

    <Box pt={4} pl={4}>
      <Heading fontSize="lg">{item.name}</Heading>
    </Box>
    <Box pt={4} pl={4} pb={4}>
      <Text fontSize="md" color="black.500">
        {item.unique_symbol}
      </Text>
    </Box>
  </Box>
);

export default TileItem;
