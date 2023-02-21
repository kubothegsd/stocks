import { isShownLoadMoreSelector, nextOffsetSelector } from '../state';
import { StockRequestState } from '../../../api/stock/data-types';

describe('isShownLoadMoreSelector', () => {
  it('always return false if data is not ready', () => {
    const meta = { total_records: 100 };
    const stockRequestState = { offset: 0, size: 12 };
    const stockDataReady = false;
    const actual = isShownLoadMoreSelector.resultFunc(
      meta,
      stockRequestState as StockRequestState,
      stockDataReady
    );
    const expected = false;
    expect(actual).toEqual(expected);
  });

  it.each`
    meta                      | stockRequestState           | expected
    ${{ total_records: 100 }} | ${{ offset: 0, size: 12 }}  | ${true}
    ${{ total_records: 100 }} | ${{ offset: 90, size: 12 }} | ${false}
  `(
    'returns $expected if meta is $meta, stockRequestState is $stockRequestState and data ready is true',
    ({ meta, stockRequestState, expected }) => {
      const actual = isShownLoadMoreSelector.resultFunc(
        meta,
        stockRequestState as StockRequestState,
        true
      );
      expect(actual).toEqual(expected);
    }
  );
});

describe('nextOffsetSelector', () => {
  it.each`
    stockRequestState           | expected
    ${{ offset: 0, size: 12 }}  | ${12}
    ${{ offset: 10, size: 12 }} | ${22}
    ${{ offset: 1, size: 120 }} | ${121}
  `(
    'returns $expected if stockRequestState is $stockRequestState',
    ({ stockRequestState, expected }) => {
      const actual = nextOffsetSelector.resultFunc(stockRequestState);
      expect(actual).toEqual(expected);
    }
  );
});
