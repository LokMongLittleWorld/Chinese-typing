import SegmentedControl from "../../../Components/common/SegmentedControl.jsx";
import React from "react";
import SpecialButton from "../../../Components/common/SpecialButton.jsx";
import { useNavigate } from "react-router-dom";
import ResultDisplayCard from "../../../Components/speedTpying/ResultDisplayCard.jsx";
import ArticleDisplay from "../../../Components/speedTpying/ArticleDisplay.jsx";

export default function Review({
  article,
  result,
  raceMode,
  raceModes,
  handlePageChange,
  HandleRaceTypeOnChange,
  resultWrongWordIndex,
}) {
  const navigateTo = useNavigate();

  const handleRaceAgain = () => {
    // TODO reset the game
    handlePageChange(2);
  };

  const resultArr = [
    {
      title: "模式",
      text: result.raceMode,
      unit: "",
    },
    {
      title: "時間",
      text: result.time,
      unit: "秒",
    },
    {
      title: "速度",
      text: result.speed,
      unit: "字/分鐘",
    },
    {
      title: "準繩度",
      text: (result.accuracy * 100).toPrecision(3),
      unit: "%",
    },
    {
      title: "完成度",
      text: (result.completion * 100).toPrecision(3),
      unit: "%",
    },
  ];

  return (
    <section className="flex flex-col gap-4 w-[768px] mt-4">
      <div className="grid grid-cols-6 gap-4">
        {resultArr.map((result, index) => (
          <ResultDisplayCard
            className={index < 2 ? "col-span-3" : "col-span-2"}
            key={index}
            title={result.title}
            text={result.text}
            unit={result.unit}
          />
        ))}
      </div>
      <ArticleDisplay
        article={article}
        type="回帶"
        wrongWordIndex={resultWrongWordIndex}
        lastWordIndex={result.completion * (article.content.length - 1)}
      />
      <SegmentedControl
        selectedSegment={raceMode}
        segments={raceModes}
        handleOnClick={HandleRaceTypeOnChange}
      />
      {/*  TODO: table to show current 3times record and world record*/}
      <div className="flex flex-row justify-between">
        <SpecialButton
          text="<<< 返回主頁"
          onClick={() => navigateTo("/speed-typing")}
        />
        <SpecialButton text="再嚟一次 >>>" onClick={handleRaceAgain} />
      </div>
    </section>
  );
}
