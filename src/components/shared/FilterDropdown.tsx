import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { useFetchStock } from '../../hooks/useFetchStock';
import {
  stockRequestStateSelector,
  resetStateForNewRequestAC,
  initialState,
} from '../../api/stock/request-state';
import { resetDataAndMetaAC } from '../../api/stock/response-state';
import {
  StockRequestState,
  StockRequestParams,
} from '../../api/stock/data-types';
import { useAppDispatch } from '../../hooks/redux';
import { getOption, Option } from './utils';

interface FilterDropdownProps {
  options: Option[];
  filterKey: keyof StockRequestParams;
}

const FilterDropdown: React.FunctionComponent<FilterDropdownProps> = ({
  options,
  filterKey,
}) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const requestState = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );
  const currentOptionValue = requestState[filterKey];
  const currentOption = getOption(currentOptionValue)(options);

  const { fetchStockData } = useFetchStock();

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setIsOpen(!isOpen);

    if (currentOptionValue === value) {
      return;
    }

    // Reset data
    dispatch(resetDataAndMetaAC());
    dispatch(resetStateForNewRequestAC());

    // fetch stock data with initial state and country
    fetchStockData({
      offset: initialState.offset,
      size: initialState.size,
      [filterKey]: value,
    });
  };

  return (
    <div className="dropdown">
      <button onClick={handleButtonClick}>{currentOption?.label}</button>
      {isOpen && (
        <ul>
          {options.map((option) => (
            <li
              key={option.option}
              onClick={() => handleOptionClick(option.option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
