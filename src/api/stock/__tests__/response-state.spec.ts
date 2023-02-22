import reducerObj, {
  appendStockDataFromResponseAC,
  setMetaFromResponseAC,
  DATA_KEY,
  META_KEY,
  stockDataReadySelector,
  resetDataAndMetaAC,
} from '../response-state';
import { Meta, Stock } from '../data-types';
import {
  genStockSample,
  genStockResponseSample,
} from '../../../utils/stock-sample-data';

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

  describe('resetDataAndMetaAC', () => {
    const previousState: Stock[] = [genStockSample({ id: 1, name: 'abc' })];
    const actual = dataReducer(previousState, resetDataAndMetaAC());
    const expected = [];
    expect(actual).toEqual(expected);
  });
});

describe('metaReducer', () => {
  const metaReducer = reducerObj[META_KEY];

  it('returns the initial state', () => {
    const actual = metaReducer(undefined, { type: undefined });
    const expected = { real_total_records: undefined };
    expect(actual).toEqual(expected);
  });

  describe('setMetaFromResponseAC', () => {
    it('updates the total record from response', () => {
      const previousState = { real_total_records: undefined };
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
      const expected = { real_total_records: 300 };
      expect(actual).toEqual(expected);
    });
  });

  describe('resetDataAndMetaAC', () => {
    const previousState = { real_total_records: 400 };
    const actual = metaReducer(previousState, resetDataAndMetaAC());
    const expected = { real_total_records: undefined };
    expect(actual).toEqual(expected);
  });
});

describe('stockDataReadySelector', () => {
  it.each`
    real_total_records | expected
    ${undefined}       | ${false}
    ${1000}            | ${true}
    ${0}               | ${true}
  `(
    'returns $expected if meta have real_total_records is $real_total_records',
    ({ real_total_records, expected }) => {
      const meta: Meta = {
        real_total_records,
      };
      const actual = stockDataReadySelector.resultFunc(meta);
      expect(actual).toEqual(expected);
    }
  );
});
