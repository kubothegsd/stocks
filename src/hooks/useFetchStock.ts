import { useCallback } from 'react';
import { StockResponse } from '../api/stock/data-types';
import { constructFetchPayload, FetchPayload } from '../api/stock/utils';
import { API_ENDPOINT } from '../constants';
import { useAppDispatch } from '../hooks/redux';
import {
  setErrorAC,
  setLoadingAC,
  setParamsAC,
  stockRequestStateSelector,
} from '../api/stock/request-state';
import {
  appendStockDataFromResponseAC,
  setMetaFromResponseAC,
} from '../api/stock/response-state';
import { StockRequestState, ErrorsResponse } from '../api/stock/data-types';
import { useAppSelector } from '../hooks/redux';

export const useFetchStock = () => {
  const dispatch = useAppDispatch();

  const {
    countryCode: defaultCountryCode,
    size: defaultSize,
    marketCapSort: defaultMarketCapSort,
    offset: defaultOffset,
  } = useAppSelector<StockRequestState>(stockRequestStateSelector);

  const fetchStockData = useCallback(
    async (
      {
        countryCode = defaultCountryCode,
        offset = defaultOffset,
        size = defaultSize,
        marketCapSort = defaultMarketCapSort,
      }: Partial<FetchPayload> = {
        countryCode: defaultCountryCode,
        offset: defaultOffset,
        size: defaultSize,
        marketCapSort: defaultMarketCapSort,
      }
    ) => {
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
          const errorJSON: ErrorsResponse = await response.json();
          const errorMsg = errorJSON.errors[0]?.detail || response.statusText;
          throw new Error(errorMsg);
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
    },
    [defaultCountryCode, defaultOffset, defaultSize, defaultMarketCapSort]
  );

  return { fetchStockData };
};
