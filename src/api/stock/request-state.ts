import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_SIZE, DEFAULT_MARKET_CAP_SORT } from '../../constants';
import { RootState } from '../../store';
import { StockRequestParams, StockRequestState } from './data-types';

export const REQUEST_KEY = 'stocks_request';

const initialState = {
  countryCode: 'ca',
  offset: 0,
  size: DEFAULT_SIZE,
  marketCapSort: DEFAULT_MARKET_CAP_SORT,
  loading: false,
  error: undefined,
} as StockRequestState;

const fetchStateSlice = createSlice({
  name: 'fetchState',
  initialState,
  reducers: {
    setParams(state, action: PayloadAction<StockRequestParams>) {
      const { countryCode, offset, size, marketCapSort } = action.payload;
      return {
        ...state,
        countryCode,
        offset,
        size,
        marketCapSort,
      };
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setParams: setParamsAC,
  setError: setErrorAC,
  setLoading: setLoadingAC,
} = fetchStateSlice.actions;

export const stockRequestStateSelector = (state: RootState) =>
  state[REQUEST_KEY];

export default { [REQUEST_KEY]: fetchStateSlice.reducer };
