import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import CountryDropdown from './CountryDropdown';
import MarketCapSortDropdown from './MarketCapSortDropdown';

const FilterSection = () => (
  <Flex
    width="100%"
    flexDirection={{ base: 'column', sm: 'row' }}
    flexWrap="wrap">
    <Box pr={{ base: 0, sm: 4 }} pl={{ base: 0, sm: 2 }} pb={4} pt={4}>
      <CountryDropdown />
    </Box>
    <Box pt={{ base: 0, sm: 4 }} pl={{ base: 0 }} pb={4}>
      <MarketCapSortDropdown />
    </Box>
  </Flex>
);

export default FilterSection;
