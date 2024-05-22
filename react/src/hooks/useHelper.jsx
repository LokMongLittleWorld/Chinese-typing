import React from "react";

const useHelper = () => {
  const getCurrentWordLength = (currentWordIndex, accWordLength) => {
    for (let i = 0; i < accWordLength.length; i++) {
      if (currentWordIndex < accWordLength[i]) {
        return i === 0
          ? accWordLength[i]
          : accWordLength[i] - accWordLength[i - 1];
      }
    }
  };

  const handleTextColor = (index, wrongWordIndex, currentWordIndex) => {
    if (wrongWordIndex?.includes(index)) {
      return "text-rose-400";
    }
    if (index < currentWordIndex) {
      return "text-gray-700";
    }
    return "text-gray-500";
  };

  const getCurrentWords = (currentWordIndex, accWordLength, randomWords) => {
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

  const handleContent = (content) => {
    //   for every last 12 characters doesn't contain a newline character, add a newline character
    const contentArray = content.split("");
    const newContentArray = [];
    let lastNewLineCharacterIndex = 0;
    for (let i = 0; i < contentArray.length; i++) {
      newContentArray.push(contentArray[i]);
      if (contentArray[i] === "\n") {
        lastNewLineCharacterIndex = i + 1;
      }
      if (i - lastNewLineCharacterIndex + 1 === 4) {
        newContentArray.push("\n");
        lastNewLineCharacterIndex = i + 1;
      }
    }
    return newContentArray.join("");
  };

  return {
    getCurrentWordLength,
    getCurrentWords,
    handleTextColor,
    handleContent,
  };
};

export default useHelper;
