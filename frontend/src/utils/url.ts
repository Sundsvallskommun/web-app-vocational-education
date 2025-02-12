const hasValue = (value: unknown | unknown[]) => {
  if (value == null || value == undefined || value === '') return false;
  if (Array.isArray(value)) {
    return !!value[0]?.toString().length;
  } else {
    return true;
  }
};

export function serializeURL(
  params: URLSearchParams | Record<string, null | string | number | (string | number)[]>,
  options: { includeEmptyValue: Record<string, boolean> } = {
    includeEmptyValue: {
      /** properties that should be included even if they have an empty value */
    },
  }
): string {
  const result: Record<string, string[]> = {};

  // Check if params is URLSearchParams or a regular object
  if (params instanceof URLSearchParams) {
    // Convert URLSearchParams to a regular object
    for (const [key, value] of params.entries()) {
      if (!hasValue(value) && !options?.includeEmptyValue[key]) continue;
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
      if (!hasValue(value) && !options?.includeEmptyValue[key]) continue;
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
    .filter(([key, values]) => (!options?.includeEmptyValue[key] ? hasValue(values) : true))
    .sort(([key], [key2]) =>
      key2 === 'q' ? 1
      : key === 'q' ? 0
      : key.localeCompare(key2)
    )
    .map(([key, values]) => `${encodeURIComponent(key)}=${values.map(encodeURIComponent).join('|')}`)
    .join('&');
}

export function deserializeURL(queryString: string) {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string | string[]> = {};

  for (const [key, value] of params.entries()) {
    // Split the value by '|' to handle multiple values
    const values = value.split('|').map(decodeURIComponent);

    if (result[key]) {
      // If the key already exists, convert to array and merge
      result[key] =
        Array.isArray(result[key]) ? (result[key] as string[]).concat(values) : [result[key] as string].concat(values);
    } else {
      result[key] = values.length > 1 ? values : values[0];
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
    return hasValue(value) ? (decodeURIComponent(value as string) as TReference) : ('' as TReference);
  } else if (typeof referenceValue === 'number') {
    // If the referenceValue is a number, parse the value as a number
    return hasValue(value) ? (parseInt(value as string) as TReference) : (0 as TReference);
  } else if (Array.isArray(referenceValue)) {
    // If the referenceValue is a number, parse the value as a number
    if (!hasValue(value)) return [] as TReference;
    if (Array.isArray(value)) {
      if (typeof referenceValue[0] === 'number') {
        return value?.map((v) => parseInt(v)) as TReference;
      }
      if (typeof referenceValue[0] === 'string') {
        return value?.map((v) => v.toString()) as TReference;
      }
    } else {
      // The referenceValue is not an array, convert the value to an array
      if (typeof referenceValue[0] === 'number') {
        return [parseInt(value?.toString() || '')] as TReference;
      }
      if (typeof referenceValue[0] === 'string') {
        return [value?.toString()] as TReference;
      }
    }
    return [] as TReference;
  } else {
    // For other types, return the value as is
    return hasValue(value) ? (value as TReference) : ('' as TReference);
  }
}

export function createObjectFromQueryString<T extends object = object, TNew extends Partial<T> = object>(
  queryString: string,
  options: {
    objectReference: T;
    objectReferenceOnly?: boolean;
    objectReferenceAsBase?: boolean;
    includeEmpty?: boolean;
  }
): Partial<T> {
  const newObject: TNew = {} as TNew;
  const _options = Object.assign(
    {},
    { objectReferenceOnly: false, objectReferenceAsBase: false, includeEmpty: false },
    options
  );
  const referenceKeys = Object.keys(_options.objectReference);

  // Use custom deserialization function
  const deserializedParams = deserializeURL(queryString);

  for (const [key, value] of Object.entries(deserializedParams)) {
    if (value !== null && (!_options.includeEmpty ? value !== '' : true)) {
      if (referenceKeys.length && referenceKeys.includes(key)) {
        newObject[key as keyof TNew] = convertValue(
          value as string,
          _options.objectReference[key as keyof T]
        ) as unknown as TNew[keyof TNew];
      } else {
        if (!_options.objectReferenceOnly) {
          newObject[key as keyof TNew] = value as TNew[keyof TNew];
        }
      }
    }
  }
  const result = {
    ...(_options.objectReferenceAsBase ? _options.objectReference : {}),
    ...newObject,
  };
  return result;
}
