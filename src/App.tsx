import React from 'react';
import LoadMoreButton from './components/LoadMoreButton';
import FilterSection from './components/FilterSection';
import Header from './components/Header';
import TileList from './components/TileList';
import { Container } from '@chakra-ui/react';

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxW="6xl">
        <FilterSection />
        <TileList />
        <LoadMoreButton />
      </Container>
    </React.Fragment>
  );
};

export { App };
