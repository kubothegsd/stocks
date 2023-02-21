import { useCallback } from 'react';
import { StockResponse } from '../api/stock/data-types';
import { constructFetchPayload, FetchPayload } from '../api/stock/utils';
import { API_ENDPOINT } from '../constants';
import { useAppDispatch } from '../hooks/redux';
import {
  setErrorAC,
  setLoadingAC,
  setParamsAC,
} from '../api/stock/request-state';
import {
  appendStockDataFromResponseAC,
  setMetaFromResponseAC,
} from '../api/stock/response-state';

export const useFetchStock = ({
  countryCode,
  offset,
  size,
  marketCapSort,
}: FetchPayload) => {
  const dispatch = useAppDispatch();

  const fetchStockData = useCallback(async () => {
    dispatch(setLoadingAC(true));
    try {
      const payload = constructFetchPayload({
        countryCode,
        offset,
        size,
        marketCapSort,
      });

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json: StockResponse = await response.json();

      dispatch(appendStockDataFromResponseAC(json));

      // persist meta data
      dispatch(setMetaFromResponseAC(json));
      dispatch(
        setParamsAC({
          countryCode,
          offset,
          size,
          marketCapSort,
        })
      );
    } catch (error) {
      dispatch(setErrorAC(error?.message || 'error'));
    } finally {
      dispatch(setLoadingAC(false));
    }
  }, [countryCode, offset, size, marketCapSort]);

  return { fetchStockData };
};
