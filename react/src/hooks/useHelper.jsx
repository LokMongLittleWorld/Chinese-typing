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
      if (
        i - lastNewLineCharacterIndex === 11 &&
        !contentArray[i + 1] === "\n"
      ) {
        newContentArray.push("\n");
        lastNewLineCharacterIndex = i + 1;
      }
    }
    return newContentArray.join("");
  };

  const toValueLabel = (options) => {
    if (options.length === 0) return [];
    return Object.entries(options).map(([key, value]) => {
      return { value: key, label: value };
    });
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return {
    toValueLabel,
    getCurrentWordLength,
    getCurrentWords,
    handleTextColor,
    handleContent,
    getRandomInt,
    isEmptyObject,
  };
};

export default useHelper;
