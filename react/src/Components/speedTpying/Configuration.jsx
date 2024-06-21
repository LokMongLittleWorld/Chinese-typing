import ArticleDisplay from "./ArticleDisplay.jsx";
import SegmentedControl from "../common/SegmentedControl.jsx";
import SpecialButton from "../common/SpecialButton.jsx";
import React from "react";

export default function Configuration({
  article,
  raceMode,
  raceModes,
  HandleRaceTypeOnChange,
  handlePageChange,
}) {
  return (
    <section className="flex flex-col gap-4 w-[768px] mt-4">
      {/* article preview*/}
      <ArticleDisplay article={article} type="預覽" />
      <SegmentedControl
        selectedSegment={raceMode}
        segments={raceModes}
        handleOnClick={HandleRaceTypeOnChange}
      />
      {/*  TODO: table to show current 3times record and world record*/}
      <div className="flex flex-row justify-end">
        <SpecialButton
          text="搖滾準備 >>>"
          onClick={() => handlePageChange(2)}
        />
      </div>
    </section>
  );
}
