export interface ListResponse<type> {
  data: type[];
  results: number;
  metadata: Metadata;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
