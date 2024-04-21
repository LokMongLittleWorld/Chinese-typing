import React from "react";
import useHelper from "../hooks/useHelper.jsx";

export default function Character({
  shouldTransition,
  accWordLength,
  currentCategory,
  currentWordIndex,
  currentWordStatus,
  randomWords,
}) {
  const { getCurrentWordLength, getCurrentWords } = useHelper();

  const { words, firstWordIndex } = getCurrentWords(
    currentWordIndex,
    accWordLength,
    randomWords
  );

  return (
    <section>
      {getCurrentWordLength(currentWordIndex, accWordLength) === 1 ? (
        <div
          className={`${currentWordIndex} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
          ${
            currentCategory === "字形訓練" &&
            "font-glyph text-[400px] md:text-[600px] xl:text-[800px] 2xl:text-[1000px]"
          }
          ${
            currentWordStatus === "correct"
              ? "text-gray-700"
              : currentWordStatus === "wrong" //&& shouldTransition
              ? "text-rose-400"
              : "text-gray-500"
          }`}
        >
          {randomWords[currentWordIndex]}
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl cursor-default select-none -z-10 flex flex-row">
          {words.map((word, index) => {
            return (
              <div key={index}>
                {index + firstWordIndex === currentWordIndex ? (
                  <div
                    className={`${
                      currentWordStatus === "wrong"
                        ? "text-rose-400"
                        : "text-gray-500"
                    }`}
                  >
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
      )}
    </section>
  );
}
