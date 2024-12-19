import _ from 'lodash';

const abbreviations = ['IT', 'SFI', 'AUB'];
export const formatAbbreviations = (word: string) => {
  if (abbreviations.includes(word.toUpperCase())) return word.toUpperCase();
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

export const fallbackDataValue = () => {
  return 'Saknas';
};
