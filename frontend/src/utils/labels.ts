import _ from 'lodash';

const abbreviations = new Map([
  ['IT', 'IT'],
  ['SFI', 'SFI'],
  ['AUB', 'ARBETSMARKNADSUTBILDNINGAR'],
]);
export const formatAbbreviations = (word: string) => {
  if (word && abbreviations.has(word.toUpperCase())) return abbreviations.get(word.toUpperCase()) as string;
  return word;
};

export const getFormattedLabelFromValue = (value: string) =>
  value
    .split(' ')
    .map((x, i) => {
      x = x.toLowerCase();
      x = formatAbbreviations(x);
      if (i === 0) {
        x = _.capitalize(x);
      }
      return x;
    })
    .join(' ');

export const fallbackDataValue = () => {
  return 'Saknas';
};

export const orFallbackDataValue = (value?: string | undefined | null | number) => {
  return value || fallbackDataValue();
};
