export const apiURL = (...parts: string[]): string => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const urlParts = [baseUrl, ...parts];
  return urlParts.map((pathPart) => pathPart?.replace(/(^\/|\/$)/g, '')).join('/');
};

export const loginURL = (): string => {
  return `${import.meta.env.VITE_LOGIN_URL}?path=${window.location.origin}${import.meta.env.VITE_BASE_PATH}`;
};

export const logoutURL = (): string => {
  return `${import.meta.env.VITE_LOGOUT_URL}`;
};
