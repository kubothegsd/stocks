export interface StockRequestParams {
  countryCode: string;
  offset: number;
  size: number;
  marketCapSort: 'asc' | 'desc';
}

export interface StockRequestState extends StockRequestParams {
  loading: boolean;
  error?: string;
}

export interface Meta {
  real_total_records: number | undefined;
}
export interface Stock {
  id: number;
  name: string;
  unique_symbol: string;
  score: {
    data: {
      value: number;
      income: number;
      health: number;
      past: number;
      future: number;
      management: number;
      misc: number;
      total: number;
      sentence: string;
    };
  };
}

export interface StockRaw extends Stock {
  [key: string]: unknown;
}

export interface StockResponse {
  data: StockRaw[];
  meta: {
    total_records: number;
    real_total_records: number;
    state: 'read' | 'write';
    noResultIfLimit: boolean;
  };
}

interface ErrorResponse {
  status: number;
  source: object;
  title: string;
  detail: string;
}
export interface ErrorsResponse {
  errors: ErrorResponse[];
}
