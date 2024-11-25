export const transformPageCreate = (extraParameters?: object) => (data: object) => {
  return {
    ...data,
    ...(extraParameters || {}),
  };
};
