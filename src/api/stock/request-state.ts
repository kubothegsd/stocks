import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  DEFAULT_SIZE,
  DEFAULT_MARKET_CAP_SORT,
  DEFAULT_COUNTRY,
} from '../../constants';
import { RootState } from '../../store';
import { StockRequestParams, StockRequestState } from './data-types';

export const REQUEST_KEY = 'stocks_request';

export const initialState = {
  countryCode: DEFAULT_COUNTRY,
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
    setError(state, action: PayloadAction<StockRequestState['error']>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<StockRequestState['loading']>) {
      state.loading = action.payload;
    },
    resetStateForNewRequest(
      state,
      action: PayloadAction<Partial<StockRequestParams>>
    ) {
      return {
        ...state,
        offset: initialState.offset,
        size: initialState.size,
        loading: initialState.loading,
        error: initialState.error,
        ...action.payload,
      };
    },
  },
});

export const {
  setParams: setParamsAC,
  setError: setErrorAC,
  setLoading: setLoadingAC,
  resetStateForNewRequest: resetStateForNewRequestAC,
} = fetchStateSlice.actions;

export const stockRequestStateSelector = (state: RootState) =>
  state[REQUEST_KEY];

export default { [REQUEST_KEY]: fetchStateSlice.reducer };
