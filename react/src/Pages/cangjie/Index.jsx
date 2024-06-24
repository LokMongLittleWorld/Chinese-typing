import React, { useRef } from "react";
import Record from "../../Components/layout/Record.jsx";
import PracticeCategory from "../../Components/layout/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import RadicalSWithCategory from "../../../static/cangjie/radicals_with_category.json";
import GlyphsWithCategory from "../../../static/cangjie/glyphs_with_category.json";
import Words from "../../../static/cangjie/words.json";
import useCharacterHelper from "../../hooks/useCharacterHelper.jsx";
import AmountSelector from "../../Components/common/AmountSelector.jsx";
import InputDisplay from "../../Components/common/InputDisplay.jsx";
import Character from "../../Components/layout/Character.jsx";
import CheatSheetModel from "../../Components/CheatSheetModel.jsx";
import RadicalsDisplay from "../../Components/layout/RadicalsDisplay.jsx";
import InvisibleInput from "../../Components/common/InvisibleInput.jsx";
import MaskContainer from "../../Components/layout/MaskContainer.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const wordJSON = [RadicalSWithCategory, GlyphsWithCategory, Words];

  //input ref
  const inputRef = useRef(null);

  // keysRecord config
  const keysRecords = [
    JSON.parse(localStorage.getItem("radicalRecord")) || keysRecordTemplate,
    JSON.parse(localStorage.getItem("glyphRecord")) || keysRecordTemplate2,
  ];
  const keysRecordNames = ["radicalRecord", "glyphRecord"];

  const initialCategoryIndex =
    localStorage.getItem("currentCategoryIndex") || 0;
  const {
    handleKeyDown,
    handleAmountChange,
    reset,
    currentCategoryIndex,
    setCurrentCategoryIndex,
    record,
    setRecord,
    currentWordIndex,
    currentWordStatus,
    amounts,
    amount,
    randomWords,
    setAmount,
    showModal,
    setShowModal,
    accWordLength,
    answerMap,
    isRunning,
    inputDisplay,
    keysRecord,
  } = useCharacterHelper(
    wordJSON[initialCategoryIndex],
    keysRecords[initialCategoryIndex],
    keysRecordNames[initialCategoryIndex]
  );

  const handleCategoryChange = (index) => {
    // TODO: dynamic import
    setCurrentCategoryIndex(index);
    localStorage.setItem("currentCategoryIndex", index);
    setRecord({ speed: 0, accuracy: 0 });
    reset(wordJSON[index], keysRecords[index], keysRecordNames[index]);
  };
  return (
    <>
      <section className="mt-4 flex flex-row items-center justify-center gap-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
        <PracticeCategory
          category={category}
          currentCategoryIndex={currentCategoryIndex}
          handleCategoryChange={handleCategoryChange}
        />
      </section>
      <main className="mt-2">
        {/* TODO: hover to display speed and accuracy, color to indicate proficiency */}
        <RadicalsDisplay keysRecord={keysRecord} />
        <CheatSheetModel showModal={showModal} setShowModal={setShowModal} />
        <MaskContainer isRunning={isRunning} className="min-h-[700px]">
          <Character
            shouldTransition={
              (answerMap.get(randomWords[currentWordIndex]) || "").length === 1
            }
            accWordLength={accWordLength}
            currentCategory={category[currentCategoryIndex]}
            currentWordIndex={currentWordIndex}
            currentWordStatus={currentWordStatus}
            randomWords={randomWords}
          />
          <section className="flex flex-col items-center absolute bottom-[12vh] left-1/2 -translate-x-1/2 gap-6">
            <InputDisplay
              answer={answerMap.get(randomWords[currentWordIndex]) || ""}
              input={inputDisplay}
              currentWordIndex={currentWordIndex}
              currentWordStatus={currentWordStatus}
              isRunning={isRunning}
              Radicals={Radicals}
            />
            <InvisibleInput handleKeyDown={handleKeyDown} inputRef={inputRef} />
            <AmountSelector
              amounts={amounts}
              amount={amount}
              setAmount={setAmount}
              isRunning={isRunning}
              handleAmountChange={handleAmountChange}
            />
          </section>
        </MaskContainer>
      </main>
    </>
  );
}

//TODO: bug fix, merge two templates into one
const keysRecordTemplate = {
  NumberOfPlay: 0,
  CurrentCategory: 0,
  Record: {},
};
const keysRecordTemplate2 = {
  NumberOfPlay: 0,
  CurrentCategory: 0,
  Record: {},
};
