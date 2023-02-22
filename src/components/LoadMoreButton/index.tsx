import React from 'react';
import { isShownLoadMoreSelector, nextOffsetSelector } from './state';
import {
  stockRequestStateSelector,
  setErrorAC,
} from '../../api/stock/request-state';
import { Button, Center } from '@chakra-ui/react';
import { StockRequestState } from '../../api/stock/data-types';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useFetchStock } from '../../hooks/useFetchStock';

const LoadMoreButton = () => {
  const dispatch = useAppDispatch();
  const isShownLoadmore = useAppSelector<boolean>(isShownLoadMoreSelector);
  const nextOffset = useAppSelector<number>(nextOffsetSelector);
  const { loading } = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );

  const { fetchStockData } = useFetchStock();

  const handleClick = () => {
    dispatch(setErrorAC());
    fetchStockData({ offset: nextOffset });
  };

  return isShownLoadmore ? (
    <Center mt={4} mb={8}>
      <Button
        colorScheme="blue"
        onClick={handleClick}
        isLoading={loading}
        loadingText="Loading">
        Load more
      </Button>
    </Center>
  ) : (
    <React.Fragment />
  );
};

export default LoadMoreButton;
