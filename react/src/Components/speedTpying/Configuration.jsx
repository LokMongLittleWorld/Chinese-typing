import ArticlePreview from "./ArticlePreview.jsx";
import SegmentedControl from "../common/SegmentedControl.jsx";
import SpecialButton from "../common/SpecialButton.jsx";
import React from "react";

export default function Configuration({
  article,
  raceType,
  raceTypes,
  HandleRaceTypeOnChange,
  handlePageChange,
}) {
  return (
    <div className="flex flex-col gap-4 w-[768px]">
      {/* article preview*/}
      <ArticlePreview article={article} />
      <SegmentedControl
        selectedSegment={raceType}
        segments={raceTypes}
        handleOnClick={HandleRaceTypeOnChange}
      />
      {/*  TODO: table to show current 3times record and world record*/}
      <div className="flex flex-row justify-end">
        <SpecialButton
          text="搖滾準備 >>>"
          onClick={() => handlePageChange(2)}
        />
      </div>
    </div>
  );
}
