import React, { useState } from 'react';
import { COUNTRIES } from '../constants';
import { useAppSelector } from '../hooks/redux';
import { useFetchStock } from '../hooks/useFetchStock';
import {
  stockRequestStateSelector,
  resetRequestStateWithAC,
  initialState,
} from '../api/stock/request-state';
import { resetDataAndMetaAC } from '../api/stock/response-state';
import { StockRequestState } from '../api/stock/data-types';
import { useAppDispatch } from '../hooks/redux';

const CountryDropdown = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { countryCode } = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );

  const { fetchStockData } = useFetchStock();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (countryCode: string) => {
    // Reset data
    dispatch(resetDataAndMetaAC());
    dispatch(resetRequestStateWithAC({ countryCode }));

    // fetch stock data with initial state and country
    fetchStockData({ ...initialState, countryCode });
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={handleButtonClick}>
        Select a country {' ' + countryCode}
      </button>
      {isOpen && (
        <ul>
          {COUNTRIES.map((country) => (
            <li
              key={country.option}
              onClick={() => handleOptionClick(country.option)}>
              {country.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryDropdown;
