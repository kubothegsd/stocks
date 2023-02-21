interface Payload {
  id: number;
  no_result_if_limit: boolean;
  offset: number;
  size: number;
  state: 'read';
  rules: string | undefined;
}

export interface FetchPayload {
  countryCode: string;
  offset: number;
  size: number;
  marketCapSort: 'asc' | 'desc';
}

export const constructFetchPayload = ({
  countryCode,
  offset,
  size,
  marketCapSort,
}: FetchPayload): Payload => ({
  id: 1,
  no_result_if_limit: false,
  offset,
  size,
  state: 'read',
  rules: JSON.stringify([
    ['order_by', 'market_cap', marketCapSort],
    ['grid_visible_flag', '=', true],
    ['market_cap', 'is_not_null'],
    ['primary_flag', '=', true],
    ['is_fund', '=', false],
    ['aor', [['country_name', 'in', [countryCode]]]],
  ]),
});
