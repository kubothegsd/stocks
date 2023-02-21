import React from 'react';
import CountryDropdown from './components/CountryDropdown';
import LoadMoreButton from './components/LoadMoreButton';
import MarketCapSortDropdown from './components/MarketCapSortDropdown';
import TileList from './components/TileList';
import { Container } from '@chakra-ui/react';

const App: React.FunctionComponent = () => {
  return (
    <Container maxW="8xl">
      <h1>This is the test app</h1>
      <CountryDropdown />
      <MarketCapSortDropdown />
      <TileList />
      <LoadMoreButton />
    </Container>
  );
};

export { App };
