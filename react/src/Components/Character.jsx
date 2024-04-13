import React from "react";

export default function Character({
  shouldTransition,
  wordLength,
  currentWordIndex,
  currentWordStatus,
  randomWords,
  font = null,
}) {
  const getCurrentWordLengthIndex = (currentWordIndex) => {
    let lengthTmp = currentWordIndex;
    for (let i = 0; i < wordLength.length; i++) {
      if (lengthTmp < wordLength[i]) {
        return i;
      }
      lengthTmp -= wordLength[i];
    }
  };

  const getCurrentWords = (currentWordIndex) => {
    const currentWordLengthIndex = getCurrentWordLengthIndex(currentWordIndex);
    let words = [];
    let currentFirstWordIndex = 0;
    for (let i = 0; i < currentWordLengthIndex; i++) {
      currentFirstWordIndex += wordLength[i];
    }
    for (let j = 0; j < wordLength[currentWordLengthIndex]; j++) {
      words.push(randomWords[currentFirstWordIndex + j]);
    }
    return words;
  };

  return (
    <section>
      {wordLength[getCurrentWordLengthIndex(currentWordIndex)] === 1 ? (
        <div
          className={`${currentWordIndex} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
          ${font ? font : ""}
          ${
            currentWordStatus === "correct"
              ? "text-gray-700"
              : currentWordStatus === "wrong" && shouldTransition
              ? "text-rose-400"
              : "text-gray-500"
          }`}
        >
          {randomWords[currentWordIndex]}
        </div>
      ) : (
        <div>{getCurrentWords(currentWordIndex)}</div>
      )}
    </section>
  );
}
