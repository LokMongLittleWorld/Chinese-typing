import React, { useEffect, useState } from "react";
import useArticleHelper from "../../../hooks/useArticleHelper.jsx";
import Article from "../../../Components/speedTpying/Article.jsx";
import useTimeCountdown from "../../../hooks/useTimeCountdown.jsx";
import MaskContainer from "../../../Components/layout/MaskContainer.jsx";
import Timer from "../../../Components/common/Timer.jsx";
import useRecorder from "../../../hooks/useRecorder.jsx";
import { toDisplayFloat } from "../../../common/function.js";

export default function Racing({
  raceMode,
  article,
  handlePageChange,
  handleResult,
  setResultWrongWordIndex,
}) {
  const {
    time,
    handleChange,
    handleKeyDown,
    currentWordIndex,
    currentLineIndex,
    inputRef,
    wrongWordIndex,
    isRunning,
    endGame,
    isEndGame,
    resetGame,
  } = useArticleHelper(article?.content);

  const { timeLeft, start, pause, reset, isTimeUp } = useTimeCountdown(
    // 3
    parseInt(raceMode.value)
  );
  const isCountDown = !isNaN(parseInt(raceMode.value));
  const [displayTime, setDisplayTime] = useState(0);
  const { speed, accuracy } = useRecorder();

  useEffect(() => {
    let interval;

    // start timer countdown
    if (isRunning && isCountDown) {
      start();
    }

    // start timer count up
    if (isRunning && !isCountDown) {
      interval = setInterval(() => {
        setDisplayTime((prev) => prev + 1);
      }, 1000);
    } else {
      setDisplayTime(0);
    }

    // hande time up
    if (isTimeUp) {
      endGame();
    }

    // handle end game before time up
    if (!isRunning && isCountDown && timeLeft !== 0) {
      pause();
    }

    // handle page change
    if (isEndGame) {
      //prettier-ignore
      const articleLength = article.content.length;
      const result = {
        time: toDisplayFloat(time),
        speed: speed(articleLength, time),
        accuracy: accuracy(articleLength, wrongWordIndex.length),
        completion: toDisplayFloat(currentWordIndex / articleLength),
        raceMode: raceMode.label,
      };
      handleResult(result);
      setResultWrongWordIndex(wrongWordIndex);
      resetGame();
      handlePageChange(3);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isTimeUp]);

  return (
    <>
      {/*Record*/}
      <div className="flex flex-row gap-4 items-center justify-center mt-2">
        <Timer
          displayTimeType={isCountDown ? "countDown" : "countUp"}
          time={isCountDown ? timeLeft : displayTime}
          isRunning={isRunning}
        />
      </div>
      {/*Article*/}
      <MaskContainer isRunning={true} className="min-h-[680px]">
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
