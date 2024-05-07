export const addIncludes = (includes, options) =>
  Object.assign(options, {
    getList: {
      include: includes,
    },
    getMany: {
      include: includes,
    },
    getManyReference: {
      include: includes,
    },
    getOne: {
      include: includes,
    },
  });
