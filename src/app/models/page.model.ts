export interface Page<T> {
  pageable: { pageSize: number, pageNumber: number };
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
}
