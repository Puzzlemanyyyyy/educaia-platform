export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
