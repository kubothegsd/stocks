import React from 'react';
import { COUNTRIES } from '../constants';
import FilterDropdown from './shared/FilterDropdown';

const MarketCapSortDropdown = () => {
  return <FilterDropdown options={COUNTRIES} filterKey="countryCode" />;
};

export default MarketCapSortDropdown;
