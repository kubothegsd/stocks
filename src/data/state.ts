import { createAction, createReducer } from '@reduxjs/toolkit';
import { Stock } from './state-types';

export const setStockDataAC = createAction<Stock[]>('stock/set');

const initialState = [] as Stock[];

const dataReducer = createReducer(initialState, (builder) => {
  builder.addCase(setStockDataAC, (_, action) => {
    return action.payload;
  });
});

export default dataReducer;
