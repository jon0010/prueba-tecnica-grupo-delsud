export interface ISearchResult<T> {
  id: number;
  name?: string;
  title?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
