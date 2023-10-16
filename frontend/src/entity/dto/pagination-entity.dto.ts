export class PaginationEntityDto<T> {
  entities: T[];
  count: number;
  page: number;
  perPage: number;

  constructor(entities: T[], count: number, page: number, perPage: number) {
    this.entities = entities;
    this.count = count;
    this.perPage = perPage;
    this.page = page;
  }
}
