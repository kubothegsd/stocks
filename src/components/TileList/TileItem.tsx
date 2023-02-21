import React from 'react';
import { Stock } from '../../api/stock/data-types';

interface TileItemProps {
  item: Stock;
}

const TileItem: React.FunctionComponent<TileItemProps> = ({ item }) => (
  <div className="tile">
    <div>ID: {item.id}</div>
    <div>Name: {item.name}</div>
    <div>Unique Symbol: {item.unique_symbol}</div>
  </div>
);

export default TileItem;
