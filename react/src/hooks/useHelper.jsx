import React from "react";

const useHelper = () => {
  let FirstWordIndex = 0;
  const getCurrentWordLength = (currentWordIndex, accWordLength) => {
    for (let i = 0; i < accWordLength.length; i++) {
      if (currentWordIndex < accWordLength[i]) {
        return i === 0
          ? accWordLength[i]
          : accWordLength[i] - accWordLength[i - 1];
      }
    }
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

  return { getCurrentWordLength, getCurrentWords };
};

export default useHelper;
