import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';
import { Stock, StockResponse, Meta } from './data-types';
import { RootState } from '../../store';

export const DATA_KEY = 'stocks_data';
export const META_KEY = 'stocks_meta';

export const appendStockDataFromResponseAC = createAction<StockResponse>(
  'stock/append_data_from_response'
);
export const setMetaFromResponseAC = createAction<StockResponse>(
  'stock/set_meta_from_response'
);
export const resetDataAndMetaAC = createAction<StockResponse>(
  'stock/reset_data_and_meta'
);

const initialData = [] as Stock[];

const dataReducer = createReducer(initialData, (builder) => {
  builder
    .addCase(appendStockDataFromResponseAC, (state, action) => {
      const { data } = action.payload;
      const pickedData = data.map((stockRaw) => {
        return {
          id: stockRaw.id,
          name: stockRaw.name,
          unique_symbol: stockRaw.unique_symbol,
          score: stockRaw.score,
        };
      });
      return [...state, ...pickedData];
    })
    .addCase(resetDataAndMetaAC, () => {
      return initialData;
    });
});

const initialMeta = { total_records: undefined } as Meta;

const metaReducer = createReducer(initialMeta, (builder) => {
  builder
    .addCase(setMetaFromResponseAC, (_, action) => {
      const { meta } = action.payload;
      return { total_records: meta.total_records };
    })
    .addCase(resetDataAndMetaAC, () => {
      return initialMeta;
    });
});

export const stockDataSelector = (state: RootState) => state[DATA_KEY];
export const stockMetaSelector = (state: RootState) => state[META_KEY];

export const stockDataReadySelector = createSelector(
  [stockMetaSelector],
  (meta: Meta) => {
    const { total_records } = meta;
    return total_records !== undefined;
  }
);

export default { [DATA_KEY]: dataReducer, [META_KEY]: metaReducer };
