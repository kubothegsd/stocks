import React from 'react';
import { MARKET_CAP_SORT_OPTIONS } from '../../constants';
import FilterDropdown from '../shared/FilterDropdown';

const MarketCapSortDropdown = () => {
  return (
    <FilterDropdown
      options={MARKET_CAP_SORT_OPTIONS}
      filterKey="marketCapSort"
    />
  );
};

export default MarketCapSortDropdown;
