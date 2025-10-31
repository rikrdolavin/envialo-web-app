export interface ApiPaginationResponse {
  status: string;
  total: number;
  limit: number;
  offset: number;
  count: number;
  results?: unknown[];
  filters?: ApiPaginationResponseFilters;
}

export interface ApiPaginationResponseFilters {
  available_categories: string[];
}

export interface InternalApiResponse<T = unknown> {
  status: string;
  success: boolean;
  httpStatus: number;
  data: T;
}