import React from 'react';
import { Stock } from '../data/state-types';
import TileItem from './TileItem';

interface TileListProps {
  data?: Stock[];
}

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

export default TileList;
