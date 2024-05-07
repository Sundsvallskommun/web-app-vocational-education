import { Request } from 'express';
import _ from 'lodash';

import { API_BASE_URL, BASE_URL_PREFIX } from '@config';
import path from 'path';
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const localApi = (...parts: string[]): string => {
  const urlParts = [BASE_URL_PREFIX, ...parts];
  return urlParts.map(pathPart => pathPart.replace(/(\/$)/g, '')).join('/');
};

export const dataDir = (_path: string): string => {
  return path.join(__dirname, '..', '..', 'data', _path);
};

export const apiURL = (...parts: string[]): string => {
  const urlParts = [API_BASE_URL, ...parts];
  return urlParts.map(pathPart => pathPart.replace(/(^\/|\/$)/g, '')).join('/');
};

export const luhnCheck = (str = ''): boolean => {
  let sum = 0;
  //str += '';

  for (let i = 0, l = str.length; i < l; i++) {
    let v = parseInt(str[i]);
    v *= 2 - (i % 2);
    if (v > 9) {
      v -= 9;
    }
    sum += v;
  }

  return sum % 10 === 0;
};

export enum OrgNumberFormat {
  DASH,
}

export const formatOrgNr = (orgNr: string, format: OrgNumberFormat = OrgNumberFormat.DASH): string | undefined => {
  const orgNumber = orgNr.replace(/\D/g, '');
  if (orgNumber.length !== 10 || !luhnCheck(orgNumber)) {
    return; // NOTE: incorrect org number
  }
  return format === OrgNumberFormat.DASH ? orgNumber.substring(0, 6) + '-' + orgNumber.substring(6, 10) : orgNumber;
};

export const isValidUrl = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

/**
 * Replaces req.body with a json-parsed data
 * Only runs if content-type contains multipart/form-data
 * @param req Request
 * @param addedFields Object containing fields you want to merge into the new req.body
 * @returns req.body
 */
export const setReqBodyIfMultiPartForm = (req: Request, addedFields?: any) => {
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    const _addedFields = addedFields || ({} as any);
    const decodedBody = {} as any;
    for (const [key, value] of Object.entries(req.body)) {
      decodedBody[key] = JSON.parse(value as any);
    }
    req.body = _.merge(decodedBody, _addedFields);
    return decodedBody;
  }
  return req.body;
};
