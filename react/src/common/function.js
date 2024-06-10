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

export const getCurrentWordLength = (currentWordIndex, accWordLength) => {
  for (let i = 0; i < accWordLength.length; i++) {
    if (currentWordIndex < accWordLength[i]) {
      return i === 0
        ? accWordLength[i]
        : accWordLength[i] - accWordLength[i - 1];
    }
  }
};

export const handleTextColor = (index, wrongWordIndex, currentWordIndex) => {
  if (wrongWordIndex?.includes(index)) {
    return "text-rose-400";
  }
  if (index < currentWordIndex) {
    return "text-gray-700";
  }
  return "text-gray-500";
};

export const getCurrentWords = (
  currentWordIndex,
  accWordLength,
  randomWords
) => {
  let words = [];
  let firstWordIndex = 0;
  let lastWordIndex = 0;
  for (let i = 0; i < accWordLength.length; i++) {
    if (currentWordIndex < accWordLength[i]) {
      firstWordIndex = accWordLength[i - 1] || 0;
      lastWordIndex = accWordLength[i];
      break;
    }
  }
  for (let i = firstWordIndex; i < lastWordIndex; i++) {
    words.push(randomWords[i]);
  }
  return { words, firstWordIndex };
};

export const handleContent = (content) => {
  if (content === undefined) return;
  //   for every last 12 characters doesn't contain a newline character, add a newline character
  const contentArray = content.split("");
  const newContentArray = [];
  let lastNewLineCharacterIndex = 0;
  for (let i = 0; i < contentArray.length; i++) {
    newContentArray.push(contentArray[i]);
    if (contentArray[i] === "\n") {
      lastNewLineCharacterIndex = i + 1;
    }
    if (i - lastNewLineCharacterIndex === 11 && !contentArray[i + 1] === "\n") {
      newContentArray.push("\n");
      lastNewLineCharacterIndex = i + 1;
    }
  }
  return newContentArray.join("");
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
