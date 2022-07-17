const pickFieldsBy = <T extends Record<string, any>>(
  source: T,

  select: (value: any) => boolean
) =>
  Object.entries(source).reduce((result, [key, value]) => {
    if (select(value)) {
      return {
        ...result,

        [key]: value
      };
    }

    return result;
  }, {});

export { pickFieldsBy };
