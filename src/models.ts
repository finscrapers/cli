interface ITransformFormat {
  key: string;
  value: string;
}

export const Types = {
  array: (
    transformInner: (value: string) => string | number,
    format: ITransformFormat,
  ) => {
    return (arr: object[]) => {
      const res: object[] = [];
      for (const obj of arr) {
        const key: string = Object.keys(obj)[0];
        (obj as any)[key] = transformInner((obj as any)[key]);
        if (!isNaN((obj as any)[key])) {
          const row: object = {};
          (row as any)[format.key] = key;
          (row as any)[format.value] = (obj as any)[key];
          res.push(row);
        }
      }
      return res;
    };
  },
  number: (value: string) => {
    return parseFloat(value.replace(/,/g, ''));
  },
  string: (value: string) => {
    return String(value);
  },
};

export const validate = (data: object, model: object) => {
  const obj: object = {};
  for (const prop in model) {
    if (model.hasOwnProperty(prop)) {
      const value: string = (data as any)[prop];
      // remove property if contains N/A
      if (value.indexOf('N/A') === -1) {
        // transform value
        const validator = (model as any)[prop];
        (obj as any)[prop] = validator(value);
      } else {
        delete (data as any)[prop];
      }
    }
  }
  return obj;
};
