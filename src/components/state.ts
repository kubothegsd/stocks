import { createSelector } from '@reduxjs/toolkit';
import {
  stockMetaSelector,
  stockDataReadySelector,
} from '../api/stock/response-state';
import { stockRequestStateSelector } from '../api/stock/request-state';
import { StockRequestState } from '../api/stock/data-types';
import { Meta } from '../api/stock/data-types';

export const isShownLoadMoreSelector = createSelector(
  [stockMetaSelector, stockRequestStateSelector, stockDataReadySelector],
  (
    meta: Meta,
    stockRequestState: StockRequestState,
    stockDataReady: boolean
  ) => {
    const { total_records } = meta;
    const { offset, size } = stockRequestState;
    const fetchNotFull = offset + size < total_records;
    return stockDataReady && fetchNotFull;
  }
);

export const nextOffsetSelector = createSelector(
  [stockRequestStateSelector],
  (stockRequestState: StockRequestState) => {
    const { offset, size } = stockRequestState;
    return offset + size;
  }
);
