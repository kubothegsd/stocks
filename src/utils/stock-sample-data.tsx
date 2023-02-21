import { Stock, StockRaw, StockResponse } from '../api/stock/data-types';

export const genStockSample = ({
  id,
  name,
  unique_symbol = 'ABXXYZ',
}: Partial<Stock>): Stock => ({
  id,
  name,
  unique_symbol,
  score: {
    data: {
      value: 1,
      income: 1,
      health: 1,
      past: 1,
      future: 1,
      management: 1,
      misc: 1,
      total: 1,
      sentence: 'sentence',
    },
  },
});

export const genRawStock = (stock: Stock): StockRaw => ({
  ...stock,
  isin_symbol: 'CA8672241079',
  ticker_symbol: 'SU',
  trading_item_id: 61847248,
});

export const genStockResponseSample = (
  stocks: Stock[],
  total_records = 100
): StockResponse => {
  const stockRaws: StockRaw[] = stocks.map(genRawStock);
  return {
    data: stockRaws,
    meta: {
      noResultIfLimit: false,
      real_total_records: 3262,
      state: 'read',
      total_records,
    },
  };
};
