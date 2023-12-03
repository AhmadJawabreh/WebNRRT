export interface StateItems<T> {
  errorMessage: string | null;
  isLoaded: boolean;
  isLoading: boolean;
  items: T[];
  totalResults: number;
}

export function initialStateItems<T>(defaultItems: T[] = []): StateItems<T> {
  return {
    errorMessage: null,
    isLoaded: false,
    isLoading: false,
    items: defaultItems,
    totalResults: 0
  };
}
