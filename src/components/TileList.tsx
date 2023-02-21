import React, { useEffect } from 'react';
import { Stock } from '../api/stock/data-types';
import TileItem from './TileItem';

import { useAppSelector } from '../hooks/redux';
import { useFetchStock } from '../hooks/useFetchStock';
import { stockRequestStateSelector } from '../api/stock/request-state';
import { StockRequestState } from '../api/stock/data-types';

import { stockDataSelector } from '../api/stock/response-state';

interface TileListProps {
  data?: Stock[];
}

const TileListWithLogic: React.FunctionComponent<TileListProps> = () => {
  const { countryCode, offset, size, marketCapSort, loading, error } =
    useAppSelector<StockRequestState>(stockRequestStateSelector);
  const stockData = useAppSelector<Stock[]>(stockDataSelector);

  const { fetchStockData } = useFetchStock({
    countryCode,
    offset,
    size,
    marketCapSort,
  });

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error... {error}</div>;
  }
  return <TileList data={stockData} />;
};

const TileList: React.FunctionComponent<TileListProps> = ({ data }) => (
  <div className="app">
    {data.map((stock) => (
      <TileItem key={stock.id} item={stock} />
    ))}
  </div>
);

TileList.defaultProps = {
  data: [],
};

export default TileListWithLogic;
