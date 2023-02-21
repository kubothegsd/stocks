import React from 'react';
import { isShownLoadMoreSelector, nextOffsetSelector } from './state';
import { stockRequestStateSelector } from '../api/stock/request-state';
import { StockRequestState } from '../api/stock/data-types';
import { useAppSelector } from '../hooks/redux';
import { useFetchStock } from '../hooks/useFetchStock';

const LoadMoreButton = () => {
  const isShownLoadmore = useAppSelector<boolean>(isShownLoadMoreSelector);
  const nextOffset = useAppSelector<number>(nextOffsetSelector);
  const { countryCode, size, marketCapSort, loading } =
    useAppSelector<StockRequestState>(stockRequestStateSelector);

  const { fetchStockData: fetchNextStockData } = useFetchStock({
    countryCode,
    size,
    offset: nextOffset,
    marketCapSort,
  });

  const handleClick = () => {
    fetchNextStockData();
  };

  console.log('rerender load more', isShownLoadmore);
  return (
    isShownLoadmore && (
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Load more'}
      </button>
    )
  );
};

export default LoadMoreButton;
