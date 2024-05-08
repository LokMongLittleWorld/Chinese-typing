import InvisibleInput from "./InvisibleInput.jsx";
import React, { useEffect, useRef } from "react";

export default function Article({
  article,
  currentLineIndex,
  handleKeyDown,
  handleChange,
  currentWordIndex,
  wrongWordIndex,
  inputRef,
  handleTextColor,
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    // Scroll to a specific position when currentWordIndex changes
    if (containerRef.current) {
      const lineHeight = 50;
      containerRef.current.scrollTop = currentLineIndex * lineHeight;
    }
  }, [currentLineIndex]);
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center z-[-1]">
      <div className="text-4xl mb-4">《{article?.title}》</div>
      <div
        ref={containerRef}
        className="max-w-4xl max-h-[300px] px-2 text-4xl leading-[50px] text-gray-700 overflow-y-hidden scrollbar-hide"
      >
        {article?.content?.split("")?.map((character, index) => {
          return (
            <>
              {character === "\n" ? (
                <br key={index} />
              ) : (
                <span
                  key={index}
                  className={`relative ${handleTextColor(
                    index,
                    wrongWordIndex,
                    currentWordIndex
                  )}`}
                >
                  {index === currentWordIndex && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-[-2px] w-[3px] h-8 rounded-lg animate-typing bg-gray-500" />
                  )}
                  {character}
                  {index === currentWordIndex && (
                    <InvisibleInput
                      handleKeyDown={handleKeyDown}
                      handleChange={handleChange}
                      inputRef={inputRef}
                    />
                  )}
                </span>
              )}
            </>
          );
        })}
        <div className=" pb-[300px]" />
      </div>
    </div>
  );
}
