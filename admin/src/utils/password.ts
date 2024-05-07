import bcrypt from 'bcryptjs';
import { Validator } from 'react-admin';

export const hashPasswordField = <TData extends { password: string }>(data: TData): TData => {
  if (!data.hasOwnProperty('password')) {
    return data;
  }

  return Object.assign(Object.assign({}, data), { password: bcrypt.hashSync(data['password'], 10) });
};

interface GeneratePasswordOptions {
  minLength: number;
  maxLength: number;
  minNumbers: number;
  minLettersLower: number;
  minLettersUpper: number;
  minSpecialCharacters: number;
  numberCharacters: string;
  letterLowerCharacters: string;
  letterUpperCharacters: string;
  specialCharacters: string;
}

const shuffleString = (string: string) => {
  var a = string.split(''),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join('');
};

/**
 * Options for generating a password.
 */
interface GeneratePasswordOptions {
  /** Minimum length of the password.
   * @default 14
   */
  minLength: number;
  /** Maximum length of the password
   * @default 14
   */
  maxLength: number;
  /** Minimum number of numeric characters
   * @default 3
   */
  minNumbers: number;
  /** Minimum number of lowercase letter characters
   * @default 3
   */
  minLettersLower: number;
  /** Minimum number of uppercase letter characters
   * @default 3
   */
  minLettersUpper: number;
  /** Minimum number of special characters
   * @default 3
   */
  minSpecialCharacters: number;
  /** Characters to be used as numeric characters
   * @default 0123456789
   */
  numberCharacters: string;
  /** Characters to be used as lowercase letter characters
   * @default abcdefghijklmnopqrstuvwxyz
   */
  letterLowerCharacters: string;
  /** Characters to be used as uppercase letter characters
   * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ
   */
  letterUpperCharacters: string;
  /** Characters to be used as special characters
   * @default !@#$%&
   */
  specialCharacters: string;
}

/**
 * Generates a random password with customizable options.
 * @param options Partial options to override default settings.
 * @returns A randomly generated password.
 * @throws Error if minLength is lower than the sum of specified min lengths for characters.
 */
export const generatePassword = (options?: Partial<GeneratePasswordOptions>): string => {
  // Default options for generating passwords
  const defaultOptions: GeneratePasswordOptions = {
    minLength: 14,
    maxLength: 14,
    minNumbers: 3,
    minLettersLower: 3,
    minLettersUpper: 3,
    minSpecialCharacters: 3,
    numberCharacters: '0123456789',
    letterLowerCharacters: 'abcdefghijklmnopqrstuvwxyz',
    letterUpperCharacters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    specialCharacters: '!@#$%&',
  };

  // Merge default options with provided options
  const _options = Object.assign(defaultOptions, options);

  // Calculate the minimum length required based on specified minimums for each character type
  const specifiedMinLength =
    _options.minNumbers + _options.minLettersLower + _options.minLettersUpper + _options.minSpecialCharacters;

  // Throw an error if minLength is lower than the sum of specified min lengths for characters
  if (specifiedMinLength > _options.minLength) {
    throw Error(`minLength cannot be lower than specific min lengths added together (${specifiedMinLength})`);
  }

  // Concatenate all character sets
  const allCharacters =
    _options.numberCharacters +
    _options.letterLowerCharacters +
    _options.letterUpperCharacters +
    _options.specialCharacters;

  // Generate random characters for each character type
  const letterLowerCharacters = Array.from(crypto.getRandomValues(new Uint32Array(_options.minLettersLower)))
    .map((x) => _options.letterLowerCharacters[x % _options.letterLowerCharacters.length])
    .join('');
  const letterUpperCharacters = Array.from(crypto.getRandomValues(new Uint32Array(_options.minLettersUpper)))
    .map((x) => _options.letterUpperCharacters[x % _options.letterUpperCharacters.length])
    .join('');
  const numberCharacters = Array.from(crypto.getRandomValues(new Uint32Array(_options.minNumbers)))
    .map((x) => _options.numberCharacters[x % _options.numberCharacters.length])
    .join('');
  const specialCharacters = Array.from(crypto.getRandomValues(new Uint32Array(_options.minSpecialCharacters)))
    .map((x) => _options.specialCharacters[x % _options.specialCharacters.length])
    .join('');

  // Combine generated characters
  const joined = letterLowerCharacters + letterUpperCharacters + numberCharacters + specialCharacters;

  // Calculate the remaining length for the password
  const diffLength = _options.maxLength - _options.minLength;
  const minMaxLength =
    diffLength > 0 ? _options.minLength + Math.floor(Math.random() * diffLength) : _options.minLength;

  // Generate random characters for the remaining length
  const rest = Array.from(crypto.getRandomValues(new Uint32Array(minMaxLength - joined.length)))
    .map((x) => allCharacters[x % allCharacters.length])
    .join('');

  // Shuffle the combined characters and return the password
  return shuffleString(joined + rest);
};

/**
 * Options for validating a password.
 */
interface ValidatePasswordOptions {
  /** Minimum length constraint for the password. */
  minLength?: number;
  /** Maximum length constraint for the password. */
  maxLength?: number;
  /** Minimum count constraint for lowercase letters. */
  minLettersLower?: number;
  /** Minimum count constraint for uppercase letters. */
  minLettersUpper?: number;
  /** Minimum count constraint for numbers. */
  minNumbers?: number;
  /** Minimum count constraint for special characters. */
  minSpecialCharacters?: number;
}

/**
 * Validates a password string based on the provided options.
 * @param password The password string to validate.
 * @param options Options specifying constraints for password validation.
 * @returns True if the password satisfies the constraints, false otherwise.
 */
export const validatePassword: Validator = (
  password: string,
  allValues?: any,
  props?: any,
  options?: ValidatePasswordOptions
) => {
  const _options: ValidatePasswordOptions = Object.assign(
    {
      minLength: 8,
      maxLength: 999,
      minLettersLower: 1,
      minLettersUpper: 1,
      minNumbers: 2,
      minSpecialCharacters: 1,
    },
    options
  );
  if (_options.minLength !== undefined && password.length < _options.minLength) {
    return { message: 'validation.password.minLength', args: { minLength: _options.minLength } };
  }

  if (_options.maxLength !== undefined && password.length > _options.maxLength) {
    return { message: 'validation.password.maxLength', args: { maxLength: _options.maxLength } };
  }

  if (_options.minLettersLower !== undefined) {
    const regex = /[a-z]/g;
    const matchCount = (password.match(regex) || []).length;
    if (matchCount < _options.minLettersLower) {
      return {
        message: 'validation.password.minLettersLower',
        args: { minLettersLower: _options.minLettersLower },
      };
    }
  }

  if (_options.minLettersUpper !== undefined) {
    const regex = /[A-Z]/g;
    const matchCount = (password.match(regex) || []).length;
    if (matchCount < _options.minLettersUpper) {
      return {
        message: 'validation.password.minLettersUpper',
        args: { minLettersUpper: _options.minLettersUpper },
      };
    }
  }

  if (_options.minNumbers !== undefined) {
    const regex = /[0-9]/g;
    const matchCount = (password.match(regex) || []).length;
    if (matchCount < _options.minNumbers) {
      return { message: 'validation.password.minNumbers', args: { minNumbers: _options.minNumbers } };
    }
  }

  if (_options.minSpecialCharacters !== undefined) {
    const regex = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const matchCount = (password.match(regex) || []).length;
    if (matchCount < _options.minSpecialCharacters) {
      return {
        message: 'validation.password.minSpecialCharacters',
        args: { minSpecialCharacters: _options.minSpecialCharacters },
      };
    }
  }

  return undefined;
};
