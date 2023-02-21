import React from 'react';
import CountryDropdown from './components/CountryDropdown';
import LoadMoreButton from './components/LoadMoreButton';
import MarketCapSortDropdown from './components/MarketCapSortDropdown';
import TileList from './components/TileList';

const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <h1>This is the test app</h1>
      <CountryDropdown />
      <MarketCapSortDropdown />
      <TileList />
      <LoadMoreButton />
    </React.Fragment>
  );
};

export { App };
