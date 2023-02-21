import { rest } from 'msw';
import {
  genStockSample,
  genStockResponseSample,
} from '../../utils/stock-sample-data';
import { Stock } from '../../api/stock/data-types';

// We use msw to intercept the network request during the test,
// and return the response after 150ms

const genSample = ({ offset, size, countryCode, totalRecords }) => {
  const stocks: Stock[] = [];
  for (let i = offset; i < offset + size; i++) {
    const sampleStock = genStockSample({
      id: i,
      name: `name${i}${countryCode}`,
      unique_symbol: 'unique_symbol${i}',
    });
    stocks.push(sampleStock);
  }
  return genStockResponseSample(stocks, totalRecords);
};

export const handlers = [
  rest.post(
    'https://api.simplywall.st/api/grid/filter',
    async (req, res, ctx) => {
      const { offset, size, rules } = await req.json();
      // :D
      const countryCode = JSON.parse(rules)[5][1][0][2][0];

      const response = genSample({
        offset,
        size,
        countryCode,
        totalRecords: 1000,
      });
      return res(ctx.json(response), ctx.delay(150));
    }
  ),
];
