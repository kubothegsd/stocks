import { constructFetchPayload } from '../../api/stock/utils';

describe('constructFetchPayload', () => {
  it('returns the correct fetch payload', () => {
    const actual = constructFetchPayload({
      countryCode: 'au',
      offset: 0,
      size: 12,
      marketCapSort: 'asc',
    });
    const expected = {
      id: 1,
      no_result_if_limit: false,
      offset: 0,
      size: 12,
      state: 'read',
      rules:
        '[["order_by","market_cap","asc"],["grid_visible_flag","=",true],["market_cap","is_not_null"],["primary_flag","=",true],["is_fund","=",false],["aor",[["country_name","in",["au"]]]]]',
    };
    expect(actual).toEqual(expected);
  });
});
