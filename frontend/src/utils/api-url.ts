export const apiURL = (...parts: string[]): string => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  const urlParts = [baseUrl, ...parts];
  return urlParts.map((pathPart) => pathPart.replace(/(^\/|\/$)/g, '')).join('/');
};
