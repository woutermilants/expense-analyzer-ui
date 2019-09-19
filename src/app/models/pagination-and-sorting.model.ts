export class PaginationAndSorting {
  page: number;
  size: number;
  sortColumn: string;
  direction: string;

  constructor(page: number, size: number, sortColumn: string, direction: string) {
    this.page = page;
    this.size = size;
    this.sortColumn = sortColumn;
    this.direction = direction;
  }
}
