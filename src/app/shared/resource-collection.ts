export interface ResourceCollection<TResource> {
  /**
   * Elapsed time of the query.
  */
  elapsedMilliseconds: number;
  /**
   * Collection of items.
  */
  items: TResource[];
  /**
   * Total items count.
  */
  totalResults: number;
  /**
   * Skip a number of records from the top of the list
  */
  skip?: number;
  /**
   * Take only a specific number of records from the list
  */
  take?: number;
}
