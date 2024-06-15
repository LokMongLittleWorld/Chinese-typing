import Record from "../layout/Record.jsx";
import React from "react";
import useArticleHelper from "../../hooks/useArticleHelper.jsx";
import Article from "./Article.jsx";
import useTimeCountdown from "../../hooks/useTimeCountdown.jsx";
import MaskContainer from "../layout/MaskContainer.jsx";

export default function Racing({ raceType, article }) {
  const {
    handleChange,
    handleKeyDown,
    currentWordIndex,
    currentLineIndex,
    inputRef,
    record,
    wrongWordIndex,
    isRunning,
  } = useArticleHelper(article?.content);

  const { timeLeft, start, pause, reset } = useTimeCountdown(
    parseInt(raceType.value)
  );

  const handleStart = () => {
    start();
  };

  return (
    <>
      {/*Record*/}
      <div
        onClick={handleStart}
        className="flex flex-row gap-4 items-center justify-center mt-2"
      >
        <Record
          speed={record.speed}
          accuracy={record.accuracy}
          time={timeLeft}
          displayTime
        />
      </div>
      {/*Article*/}
      <MaskContainer isRunning={isRunning} className="min-h-[680px]">
        <Article
          article={article}
          currentLineIndex={currentLineIndex}
          handleKeyDown={handleKeyDown}
          handleChange={handleChange}
          currentWordIndex={currentWordIndex}
          wrongWordIndex={wrongWordIndex}
          inputRef={inputRef}
        />
      </MaskContainer>
    </>
  );
}
