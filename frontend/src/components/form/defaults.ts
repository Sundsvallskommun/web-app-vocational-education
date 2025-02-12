export const categoryFilterPlaceholder = (count: number): string =>
  count > 1 ? 'Utbildningskategori(er)' : 'Utbildningskategori';

export const distanceFilterPlaceholder = 'Distansutbildning';
export const booleanFilter = [
  { label: 'Inget angett', value: '' },
  { label: 'Ja', value: true },
  { label: 'Nej', value: false },
];

export const latestApplicationDatePlaceholder = 'Sista ansökningsdatum';

export const levelFilterPlaceholder = (count: number): string =>
  count > 1 ? 'Utbildningsform(er)' : 'Utbildningsform';
export const levelFilter = [
  { label: 'Folkhögskola', value: 'Folkhögskola' },
  { label: 'Högskola och universitet', value: 'Högskola och universitet' },
  { label: 'Komvux', value: 'Komvux' },
  { label: 'Konst- och kulturutbildningar', value: 'Konst- och kulturutbildningar' },
  { label: 'Utbildningar via arbetsförmedlingen', value: 'Utbildningar via arbetsförmedlingen' },
  { label: 'Yrkeshögskola', value: 'Yrkeshögskola' },
  { label: 'Gymnasial utbildning', value: 'Gymnasial utbildning' },
];

export const scopeFilterPlaceholder = (count: number): string => (count > 1 ? 'Studietakt(er)' : 'Studietakt');

export const sortListPlaceholder = 'Sortera efter';
export const sortFilter = [
  { label: 'Sista ansökningsdatum', value: 'latestApplication,asc;name,asc' },
  { label: 'A -> Ö', value: 'name,asc' },
  { label: 'Ö -> A', value: 'name,desc' },
];

export const startDatePlaceholder = 'Start från';

export const studyLocationFilterPlaceholder = (count: number): string => (count > 1 ? 'Kommun(er)' : 'Kommun');

export const timeIntervalFilterPlaceholder = 'Tidsintervall';
export const timeIntervalFilter = [
  { label: '12 månader', value: '12' },
  { label: '6 månader', value: '6' },
  { label: 'Tidsintervall', value: '0' },
];
