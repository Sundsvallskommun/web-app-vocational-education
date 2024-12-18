export const arraysAreEqual = <T>(arr1: T[], arr2: T[]): boolean =>
  arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]);

export const getObjectDifference = <T extends object>(a: T, b: T): Partial<T> => {
  const result: Partial<T> = {};

  (Object.keys(b) as (keyof T)[]).forEach((key) => {
    const aValue = a[key];
    const bValue = b[key];
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      if (!arraysAreEqual(aValue, bValue)) {
        result[key] = bValue;
      }
    } else if (aValue !== bValue) {
      result[key] = bValue;
    }
  });

  return result;
};
