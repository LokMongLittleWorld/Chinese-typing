export const isStringValid = (input) => {
  return input !== null && typeof input === "string" && input.length > 0;
};
