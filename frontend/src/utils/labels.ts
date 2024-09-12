import _ from 'lodash';

export const formatAbbreviations = (word: string) => {
  if (word.match(/it/i)) return word.toUpperCase();
  if (word.match(/sfi/i)) return word.toUpperCase();
  if (word.match(/aub/i)) return word.toUpperCase();

  return word;
};

export const getFormattedLabelFromValue = (value: string) =>
  value
    .split(' ')
    .map((x, i) => {
      if (i === 0) {
        x = _.capitalize(x);
      } else {
        x = x.toLowerCase();
      }
      return formatAbbreviations(x);
    })
    .join(' ');
