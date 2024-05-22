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

  return { getCurrentWordLength, getCurrentWords, handleTextColor };
};

export default useHelper;
