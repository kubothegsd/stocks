import { rest } from 'msw';
import {
  genStockSample,
  genStockResponseSample,
} from '../utils/stock-sample-data';
import { Stock, ErrorsResponse } from '../api/stock/data-types';

// We use msw to intercept the network request during the test,
// and return the response after 150ms

const genSample = ({
  offset,
  size,
  countryCode,
  marketCapSort,
  totalRecords,
}) => {
  const stocks: Stock[] = [];
  for (let i = offset; i < offset + size; i++) {
    const sampleStock = genStockSample({
      id: i,
      name: `name-${i}-${countryCode}-${marketCapSort}`,
      unique_symbol: 'unique_symbol${i}',
    });
    stocks.push(sampleStock);
  }
  return genStockResponseSample(stocks, totalRecords);
};

export const emptyResponse = rest.post(
  'https://api.simplywall.st/api/grid/filter',
  async (req, res, ctx) => {
    const emptyResponse = genStockResponseSample([], 0);
    return res(ctx.json(emptyResponse), ctx.delay(150));
  }
);

export const errorResponse = rest.post(
  'https://api.simplywall.st/api/grid/filter',
  async (req, res, ctx) => {
    const errorResponse: ErrorsResponse = {
      errors: [
        {
          status: 400,
          source: {},
          title: 'errorTile',
          detail: 'errorDetail',
        },
      ],
    };
    return res(ctx.status(400), ctx.json(errorResponse), ctx.delay(150));
  }
);

export const dataResponse = rest.post(
  'https://api.simplywall.st/api/grid/filter',
  async (req, res, ctx) => {
    const { offset, size, rules } = await req.json();
    // :D
    const countryCode = JSON.parse(rules)[5][1][0][2][0];
    const marketCapSort = JSON.parse(rules)[0][2];

    const response = genSample({
      offset,
      size,
      countryCode,
      marketCapSort,
      totalRecords: 1000,
    });
    return res(ctx.json(response), ctx.delay(150));
  }
);

export const handlers = [dataResponse, emptyResponse, errorResponse];
