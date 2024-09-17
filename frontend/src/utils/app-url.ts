export const appURL = (path = ''): string => {
  return `${window.location.origin}${process.env.NEXT_PUBLIC_BASE_PATH}${path}`;
};
