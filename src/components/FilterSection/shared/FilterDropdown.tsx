import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Button,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../../hooks/redux';
import { useFetchStock } from '../../../hooks/useFetchStock';
import {
  stockRequestStateSelector,
  resetStateForNewRequestAC,
  initialState,
} from '../../../api/stock/request-state';
import { resetDataAndMetaAC } from '../../../api/stock/response-state';
import {
  StockRequestState,
  StockRequestParams,
} from '../../../api/stock/data-types';
import { useAppDispatch } from '../../../hooks/redux';
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
  const requestState = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );
  const currentOptionValue = requestState[filterKey];
  const currentOption = getOption(currentOptionValue)(options);

  const { fetchStockData } = useFetchStock();

  const handleOptionClick = (value: string) => {
    if (currentOptionValue === value) {
      return;
    }

    // Reset data
    dispatch(resetDataAndMetaAC());
    dispatch(resetStateForNewRequestAC({ [filterKey]: value }));

    // fetch stock data with initial state and country
    fetchStockData({
      offset: initialState.offset,
      size: initialState.size,
      [filterKey]: value,
    });
  };

  return (
    <div className="dropdown">
      <Menu>
        <MenuButton
          colorScheme="blue"
          as={Button}
          rightIcon={<ChevronDownIcon />}>
          {currentOption?.label}
        </MenuButton>
        <MenuList
          maxHeight="200px"
          overflowY="auto"
          _focus={{ outline: 'none' }}>
          <MenuOptionGroup type="radio" value={currentOption?.option}>
            {options.map((option) => (
              <MenuItemOption
                key={option.option}
                value={option.option}
                onClick={() => handleOptionClick(option.option)}>
                {option.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </div>
  );
};

export default FilterDropdown;
