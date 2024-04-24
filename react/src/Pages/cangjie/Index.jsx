import React, { useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import Glyphs from "../../../static/cangjie/glyphs.json";
import Words from "../../../static/cangjie/words.json";
import useCharacterHelper from "../../hooks/useCharacterHelper.jsx";
import AmountSelector from "../../Components/AmountSelector.jsx";
import InputDisplay from "../../Components/InputDisplay.jsx";
import Character from "../../Components/Character.jsx";
import CheatSheetModel from "../../Components/CheatSheetModel.jsx";
import RadicalsDisplay from "../../Components/RaicalsDisplay.jsx";
import InvisibleInput from "../../Components/InvisibleInput.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(
    localStorage.getItem("currentCategoryIndex") || 0
  );
  const wordJSON = [Radicals, Glyphs, Words];
  const {
    handleKeyDown,
    handleAmountChange,
    reset,
    record,
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
  } = useCharacterHelper(wordJSON[currentCategoryIndex]);

  const handleCategoryChange = (category, index) => {
    // TODO: dynamic import
    setCurrentCategoryIndex(index);
    localStorage.setItem("currentCategoryIndex", index);
    if (category === "字根訓練") reset(Radicals);
    if (category === "字形訓練") reset(Glyphs);
    if (category === "單字訓練") reset(Words);
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
        <RadicalsDisplay />
        <CheatSheetModel showModal={showModal} setShowModal={setShowModal} />
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
      </main>
      <div className="flex flex-col items-center absolute bottom-[10vh] left-1/2 -translate-x-1/2 gap-6">
        <InputDisplay
          answer={answerMap.get(randomWords[currentWordIndex]) || ""}
          input={inputDisplay}
          currentWordIndex={currentWordIndex}
          currentWordStatus={currentWordStatus}
          Radicals={Radicals}
        />
        <AmountSelector
          amounts={amounts}
          amount={amount}
          setAmount={setAmount}
          isRunning={isRunning}
          handleAmountChange={handleAmountChange}
        />
      </div>
      <InvisibleInput handleKeyDown={handleKeyDown} />
    </>
  );
}
