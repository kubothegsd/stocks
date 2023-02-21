import reducerObj, {
  appendStockDataFromResponseAC,
  setMetaFromResponseAC,
  DATA_KEY,
  META_KEY,
  stockDataReadySelector,
} from '../response-state';
import { Meta, Stock, StockRaw, StockResponse } from '../data-types';

const genStockSample = ({
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

const genRawStock = (stock: Stock): StockRaw => ({
  ...stock,
  isin_symbol: 'CA8672241079',
  ticker_symbol: 'SU',
  trading_item_id: 61847248,
});

const genStockResponseSample = (
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

describe('dataReducer', () => {
  const dataReducer = reducerObj[DATA_KEY];

  it('returns the initial state', () => {
    const actual = dataReducer(undefined, { type: undefined });
    const expected = [];
    expect(actual).toEqual(expected);
  });

  describe('appendStockDataFromResponseAC', () => {
    it('appends response to an empty list', () => {
      const previousState: Stock[] = [];
      const sampleStock = genStockSample({ id: 1, name: 'abc' });
      const sampleStockResponse = genStockResponseSample([sampleStock]);

      const actual = dataReducer(
        previousState,
        appendStockDataFromResponseAC(sampleStockResponse)
      );
      const expected = [sampleStock];
      expect(actual).toEqual(expected);
    });

    test('appends response to an existing list', () => {
      const previousState: Stock[] = [genStockSample({ id: 1, name: 'abc' })];
      const newStock = genStockSample({ id: 2, name: 'abc2' });
      const sampleStockResponse = genStockResponseSample([newStock]);

      const actual = dataReducer(
        previousState,
        appendStockDataFromResponseAC(sampleStockResponse)
      );
      const expected = [...previousState, newStock];
      expect(actual).toEqual(expected);
    });
  });
});

describe('metaReducer', () => {
  const metaReducer = reducerObj[META_KEY];

  it('returns the initial state', () => {
    const actual = metaReducer(undefined, { type: undefined });
    const expected = { total_records: undefined };
    expect(actual).toEqual(expected);
  });

  describe('setMetaFromResponseAC', () => {
    it('updates the total record from response', () => {
      const previousState = { total_records: undefined };
      const sampleStock = genStockSample({ id: 1, name: 'abc' });
      const totalRecord = 300;
      const sampleStockResponse = genStockResponseSample(
        [sampleStock],
        totalRecord
      );

      const actual = metaReducer(
        previousState,
        setMetaFromResponseAC(sampleStockResponse)
      );
      const expected = { total_records: 300 };
      expect(actual).toEqual(expected);
    });
  });
});

describe('stockDataReadySelector', () => {
  it.each`
    total_records | expected
    ${undefined}  | ${false}
    ${1000}       | ${true}
    ${0}          | ${true}
  `(
    'returns $expected if meta have total_records is $total_records',
    ({ total_records, expected }) => {
      const meta: Meta = {
        total_records,
      };
      const actual = stockDataReadySelector.resultFunc(meta);
      expect(actual).toEqual(expected);
    }
  );
});
