import React, { useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import Initials from "../../../static/jyutping/initial_practice.json";
import Words from "../../../static/cangjie/words.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";
import useCharacterHelper from "../../hooks/useCharacterHelper.jsx";
import Character from "../../Components/Character.jsx";
import AmountSelector from "../../Components/AmountSelector.jsx";
import InputDisplay from "../../Components/InputDisplay.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(
    localStorage.getItem("currentCategoryIndex") || 0
  );
  const wordJSON = [Radicals, Initials, Words];
  const {
    record,
    currentWordIndex,
    currentWordStatus,
    shouldTransition,
    amounts,
    amount,
    randomWords,
    handleKeyDown,
    setAmount,
    reset,
    isRunning,
    answer,
    input,
  } = useCharacterHelper(wordJSON[currentCategoryIndex]);

  useKeyDownHandler(handleKeyDown, [currentWordIndex, randomWords]);

  const handleCategoryChange = (category, index) => {
    // TODO: dynamic import
    setCurrentCategoryIndex(index);
    localStorage.setItem("currentCategoryIndex", index);
    if (category === "字根訓練") reset(Radicals);
    if (category === "字形訓練") reset(Initials);
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
        <div className="flex flex-row gap-4 justify-center text-2xl">
          {Object.keys(Radicals).map((radical) => {
            return (
              <div key={radical} className="select-none">
                {radical}
              </div>
            );
          })}
        </div>
        <Character
          //shouldTransition={shouldTransition}
          //currentWordStatus={currentWordStatus}
          character={randomWords[currentWordIndex]}
        />
      </main>
      <div className="flex flex-col items-center absolute bottom-[10vh] left-1/2 -translate-x-1/2 gap-6">
        <InputDisplay
          answer={answer}
          input={input}
          isRunning={isRunning}
          currentWordIndex={currentWordIndex}
          currentWordStatus={currentWordStatus}
        />
        <AmountSelector
          amounts={amounts}
          amount={amount}
          setAmount={setAmount}
          isRunning={isRunning}
        />
      </div>
    </>
  );
}
