export interface DataFetch<T> {
  // data: T[] | null;
  data: T[];
  isLoading: Boolean;
  error: Error | null;
}
