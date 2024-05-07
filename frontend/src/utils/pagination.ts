/**
 * Retrieves a slice of an array representing the portion of data to render on the current page of a table.
 * @param list The array of data to paginate.
 * @param page The current page number (1-indexed).
 * @param pageSize The number of items to display per page.
 * @returns An array representing the portion of data to render on the current page.
 */
export const getPageListSlice = <T = unknown>(list: T[], page: number, pageSize: number): T[] => {
  // Calculate the starting index of the slice based on the current page and page size
  const startIndex: number = (page - 1) * pageSize;
  // Return a slice of the array from the calculated starting index to startIndex + pageSize
  return list.slice(startIndex, startIndex + pageSize);
};
