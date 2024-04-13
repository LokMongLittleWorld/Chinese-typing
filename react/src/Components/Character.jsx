import React from "react";

export default function Character({
  shouldTransition,
  AccWordLength,
  currentWordIndex,
  currentWordStatus,
  randomWords,
}) {
  let FirstWordIndex = 0;
  const getCurrentWordLength = (currentWordIndex) => {
    for (let i = 0; i < AccWordLength.length; i++) {
      if (currentWordIndex < AccWordLength[i]) {
        return i === 0
          ? AccWordLength[i]
          : AccWordLength[i] - AccWordLength[i - 1];
      }
    }
  };

  const getCurrentWords = (currentWordIndex) => {
    let words = [];
    let lastWordIndex = 0;
    for (let i = 0; i < AccWordLength.length; i++) {
      if (currentWordIndex < AccWordLength[i]) {
        FirstWordIndex = AccWordLength[i - 1] || 0;
        lastWordIndex = AccWordLength[i];
        break;
      }
    }
    for (let i = FirstWordIndex; i < lastWordIndex; i++) {
      words.push(randomWords[i]);
    }
    return words;
  };

  return (
    <section>
      {getCurrentWordLength(currentWordIndex) === 1 ? (
        <div
          className={`${currentWordIndex} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
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
          {getCurrentWords(currentWordIndex).map((word, index) => {
            return index + FirstWordIndex === currentWordIndex ? (
              <div
                className={`${
                  currentWordStatus === "wrong"
                    ? "text-rose-400"
                    : "text-gray-500"
                }`}
              >
                {" "}
                {word}{" "}
              </div>
            ) : index + FirstWordIndex < currentWordIndex ? (
              <div className="text-gray-700"> {word}</div>
            ) : (
              <div className="text-gray-500"> {word}</div>
            );
          })}
        </div>
      )}
    </section>
  );
}
