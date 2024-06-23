export interface PaginationResult<T> {
  data: T[] | null;
  totalItems: number;
  page: number;
  limit: number;
}

export interface FindBooksSchema {
  page: number,
  limit: number,
  order?: string,
  search?: string,
  inStock?: boolean
}