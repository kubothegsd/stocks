import React from 'react';
import { isShownLoadMoreSelector, nextOffsetSelector } from './state';
import { stockRequestStateSelector } from '../../api/stock/request-state';
import { StockRequestState } from '../../api/stock/data-types';
import { useAppSelector } from '../../hooks/redux';
import { useFetchStock } from '../../hooks/useFetchStock';
import { Button, Center } from '@chakra-ui/react';

const LoadMoreButton = () => {
  const isShownLoadmore = useAppSelector<boolean>(isShownLoadMoreSelector);
  const nextOffset = useAppSelector<number>(nextOffsetSelector);
  const { loading } = useAppSelector<StockRequestState>(
    stockRequestStateSelector
  );

  const { fetchStockData } = useFetchStock();

  const handleClick = () => {
    fetchStockData({ offset: nextOffset });
  };

  return (
    isShownLoadmore && (
      <Center mt={4} mb={8}>
        <Button
          colorScheme="blue"
          onClick={handleClick}
          isLoading={loading}
          loadingText="Loading">
          Load more
        </Button>
      </Center>
    )
  );
};

export default LoadMoreButton;
