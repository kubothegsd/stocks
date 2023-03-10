import reducerObj, {
  setParamsAC,
  setLoadingAC,
  setErrorAC,
  resetStateForNewRequestAC,
  REQUEST_KEY,
} from '../request-state';
import { StockRequestState, StockRequestParams } from '../data-types';
describe('requestStateReducer', () => {
  const requestStateReducer = reducerObj[REQUEST_KEY];

  const initState: StockRequestState = {
    countryCode: 'au',
    offset: 0,
    size: 12,
    marketCapSort: 'desc',
    loading: false,
    error: undefined,
  };

  it('returns the initial state', () => {
    const actual = requestStateReducer(undefined, { type: undefined });
    const expected = initState;
    expect(actual).toEqual(expected);
  });

  describe('setParams', () => {
    it('updates the total record from response', () => {
      const previousState = initState;
      const payload: StockRequestParams = {
        countryCode: 'au',
        offset: 12,
        size: 120,
        marketCapSort: 'asc',
      };
      const actual = requestStateReducer(previousState, setParamsAC(payload));
      const expected = {
        countryCode: 'au',
        offset: 12,
        size: 120,
        marketCapSort: 'asc',
        loading: false,
        error: undefined,
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('setLoadingAC', () => {
    it('updates the total record from response', () => {
      const previousState = initState;
      const payload = true;
      const actual = requestStateReducer(previousState, setLoadingAC(payload));
      const expected = {
        countryCode: 'au',
        offset: 0,
        size: 12,
        marketCapSort: 'desc',
        loading: true,
        error: undefined,
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('setErrorAC', () => {
    it('updates the total record from response', () => {
      const previousState = initState;
      const payload = 'This is the error';
      const actual = requestStateReducer(previousState, setErrorAC(payload));
      const expected = {
        countryCode: 'au',
        offset: 0,
        size: 12,
        marketCapSort: 'desc',
        loading: false,
        error: 'This is the error',
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('resetStateForNewRequest', () => {
    it('resets request state needed for new request', () => {
      const previousState: StockRequestState = {
        countryCode: 'au',
        offset: 0,
        size: 12,
        marketCapSort: 'asc',
        loading: false,
        error: 'This is the error',
      };

      const actual = requestStateReducer(
        previousState,
        resetStateForNewRequestAC({ countryCode: 'ca' })
      );
      const expected = {
        ...initState,
        countryCode: 'ca',
        marketCapSort: 'asc',
      };
      expect(actual).toEqual(expected);
    });
  });
});
