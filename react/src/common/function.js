export const isStringValid = (input) => {
  return input !== null && typeof input === "string" && input.length > 0;
};

export const getFirstProperty = (obj) => {
  if (typeof obj !== "object") return {};
  return obj[Object.keys(obj)[0]];
};

export const toValueLabel = (options) => {
  // input: { key: value } return: [{ value: key, label: value }, ...]
  if (typeof options !== "object" || options.length === 0) return [];
  return Object.entries(options).map(([key, value]) => {
    return { value: key, label: value };
  });
};
