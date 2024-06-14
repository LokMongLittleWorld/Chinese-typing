import React from "react";
import {
  getCurrentWordLength,
  getCurrentWords,
} from "../../common/function.js";

export default function Character({
  shouldTransition,
  accWordLength,
  currentCategory,
  currentWordIndex,
  currentWordStatus,
  randomWords,
}) {
  const { words, firstWordIndex } = getCurrentWords(
    currentWordIndex,
    accWordLength,
    randomWords
  );

  const handleTextColor = (currentWordStatus) => {
    //TODO: add animation for wrong input
    return currentWordStatus === "wrong" ? "text-rose-400" : "text-gray-500";
  };

  const SingleCharacter = () => (
    <div
      className={`${currentWordIndex} flex items-center justify-center text-[200px] md:text-[300px] xl:text-[400px] cursor-default select-none
          ${currentCategory === "字形訓練" && "font-glyph"}
          ${handleTextColor(currentWordStatus)}`}
    >
      {randomWords[currentWordIndex]}
    </div>
  );

  const MultipleCharacters = () => (
    <div className="flex flex-row items-center justify-center text-9xl cursor-default select-none">
      {words.map((word, index) => {
        return (
          <div key={index}>
            {index + firstWordIndex === currentWordIndex ? (
              <div className={`${handleTextColor(currentWordStatus)}`}>
                {word}
              </div>
            ) : index + firstWordIndex < currentWordIndex ? (
              <div className="text-gray-700"> {word}</div>
            ) : (
              <div className="text-gray-500"> {word}</div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="">
      {getCurrentWordLength(currentWordIndex, accWordLength) === 1 ? (
        <SingleCharacter />
      ) : (
        <MultipleCharacters />
      )}
    </section>
  );
}
