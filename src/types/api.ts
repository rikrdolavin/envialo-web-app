export interface ApiPaginationResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data?: T[];
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

export interface ApiResponse<T = unknown> {
  success: boolean;
  errorCode: string | null;
  message: string | null;
  data: T | null;
}
