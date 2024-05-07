const hasValue = (value: string | string[]) => {
  if (value == null || value == undefined || value === '') return false;
  if (Array.isArray(value)) {
    return !!value[0]?.length;
  } else {
    return true;
  }
};
export const addToQueryString = (...queryObj: Record<string, unknown>[]) => {
  const _queryObj = Object.assign({}, ...queryObj);
  const params = new URLSearchParams(window.location.search);
  const collectedObj = Object.assign({}, Object.fromEntries(params), _queryObj);
  Object.keys(collectedObj).forEach((key) => {
    const value = collectedObj[key];
    if (value === undefined) {
      // let be
    } else if (hasValue(value)) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};

export const objToQueryString = (...queryObj: Record<string, unknown>[]) => {
  const _queryObj = Object.assign({}, ...queryObj);
  const params = new URLSearchParams();
  Object.keys(_queryObj).forEach((key) => {
    const value = _queryObj[key];
    if (value === undefined) {
      // let be
    } else if (hasValue(value)) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });
  return params.toString();
};

export const queryStringToObj = (query: string) => {
  return Object.fromEntries([...new URLSearchParams(query)]);
};

function convertValue<TReference = string | string[] | number>(
  value: string | null,
  referenceValue: TReference
): TReference {
  if (Array.isArray(referenceValue)) {
    // If the referenceValue is an array, assume it's an array of strings
    return value ? (value.split(',').map((item) => decodeURIComponent(item)) as TReference) : ([] as TReference);
  } else if (typeof referenceValue === 'string') {
    // If the referenceValue is a string, return the value as is
    return value ? (decodeURIComponent(value) as TReference) : ('' as TReference);
  } else if (typeof referenceValue === 'number') {
    // If the referenceValue is a number, parse the value as a number
    return value ? (parseInt(value) as TReference) : (0 as TReference);
  } else {
    // For other types, return the value as is
    return value ? (value as TReference) : ('' as TReference);
  }
}

export function createObjectFromQueryString<T = unknown>(
  queryString: string,
  options: { objectReference: T; objectReferenceOnly?: boolean; objectReferenceAsBase?: boolean }
) {
  const newObject: Partial<T> = {};
  const _options = Object.assign({}, { objectReferenceOnly: false, objectReferenceAsBase: false }, options);
  const referenceKeys = Object.keys(_options.objectReference);

  for (const [key, value] of new URLSearchParams(queryString)) {
    if (value !== null && value !== '') {
      if (referenceKeys.length && referenceKeys.includes(key)) {
        newObject[key as keyof T] = convertValue(value, _options.objectReference[key]);
      } else {
        if (!_options.objectReferenceOnly) {
          newObject[key] = value;
        }
      }
    }
  }
  return Object.assign({}, _options.objectReferenceAsBase ? _options.objectReference : {}, newObject);
}
