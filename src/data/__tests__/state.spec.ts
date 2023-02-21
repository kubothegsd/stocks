import dataReducer, { setStockDataAC } from '../state';
import { Stock } from '../state-types';

describe('dataReducer', () => {
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

  it('returns the initial state', () => {
    const actual = dataReducer(undefined, { type: undefined });
    const expected = [];
    expect(actual).toEqual(expected);
  });

  describe('Handle set action', () => {
    it('handles data set to an empty list', () => {
      const previousState: Stock[] = [];
      const sampleStockData = [genStockSample({ id: 1, name: 'abc' })];

      const actual = dataReducer(
        previousState,
        setStockDataAC(sampleStockData)
      );
      const expected = sampleStockData;
      expect(actual).toEqual(expected);
    });

    test('handles a stock data set to an existing list', () => {
      const previousState: Stock[] = [genStockSample({ id: 1, name: 'abc' })];
      const newState: Stock[] = [genStockSample({ id: 2, name: 'abc2' })];

      const actual = dataReducer(previousState, setStockDataAC(newState));
      const expected = newState;
      expect(actual).toEqual(expected);
    });
  });
});
