const hasValue = (value: string | string[]) => {
  if (value == null || value == undefined || value === '') return false;
  if (Array.isArray(value)) {
    return !!value[0]?.length;
  } else {
    return true;
  }
};

export function serializeURL(params: URLSearchParams | Record<string, string | number | (string | number)[]>): string {
  const result: Record<string, string[]> = {};

  // Check if params is URLSearchParams or a regular object
  if (params instanceof URLSearchParams) {
    // Convert URLSearchParams to a regular object
    for (const [key, value] of params.entries()) {
      if (Array.isArray(value)) {
        // Convert all values in the array to strings
        result[key] = value.map((v) => String(v));
      } else {
        // Convert single value to string
        result[key] = [String(value)];
      }
    }
  } else {
    // Assume params is a regular object
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        // Convert all values in the array to strings
        result[key] = value.map((v) => String(v));
      } else {
        // Convert single value to string
        result[key] = [String(value)];
      }
    }
  }

  // Serialize using "|" as delimiter
  return Object.entries(result)
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => `${encodeURIComponent(key)}=${values.map(encodeURIComponent).join('|')}`)
    .join('&');
}

export function deserializeURL(queryString) {
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params.entries()) {
    // Split the value by '|' to handle multiple values
    const values = value.split('|').map(decodeURIComponent);

    // If the key already exists, merge the values; otherwise, set it
    if (result[key]) {
      result[key] = result[key].concat(values);
    } else {
      result[key] = values;
    }
  }

  return result;
}

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
  return serializeURL(params);
};

function convertValue<TReference = string | string[] | number>(
  value: string | null,
  referenceValue: TReference
): TReference {
  if (typeof referenceValue === 'string') {
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

  // Use custom deserialization function
  const deserializedParams = deserializeURL(queryString);

  for (const [key, value] of Object.entries(deserializedParams)) {
    if (value !== null && value !== '') {
      if (referenceKeys.length && referenceKeys.includes(key)) {
        newObject[key as keyof T] = convertValue(value as string, _options.objectReference[key]);
      } else {
        if (!_options.objectReferenceOnly) {
          newObject[key] = value;
        }
      }
    }
  }
  return Object.assign({}, _options.objectReferenceAsBase ? _options.objectReference : {}, newObject);
}
