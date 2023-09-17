import React, { useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Initials from "../../../static/jyutping/initial_practice.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";
import useCharacterHelper from "../../hooks/useCharacterHelper.jsx";
import Character from "../../Components/Character.jsx";
import AmountSelector from "../../Components/AmountSelector.jsx";

//prettier-ignore
const initials = ["b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "h", "gw", "kw", "w", "z", "c", "s", "j"];
export default function Index() {
  const category = ["聲母訓練", "韻母訓練", "單字訓練"];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(
    localStorage.getItem("currentCategoryIndex") || 0
  );
  const wordJSON = [Initials, Initials, Initials];
  const {
    record,
    currentRadicalIndex,
    currentRadicalStatus,
    shouldTransition,
    amounts,
    amount,
    randomRadicals,
    handleKeyDown,
    setAmount,
    reset,
  } = useCharacterHelper(wordJSON[currentCategoryIndex]);

  useKeyDownHandler(handleKeyDown, [currentRadicalIndex, randomRadicals]);

  const handleCategoryChange = (category, index) => {
    // TODO: dynamic import
    setCurrentCategoryIndex(index);
    localStorage.setItem("currentCategoryIndex", index);
    if (category === "字根訓練") reset(Initials);
    if (category === "字形訓練") reset(Initials);
    if (category === "單字訓練") reset(Initials);
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
        <section className="flex flex-row gap-4 justify-center text-2xl">
          {initials.map((radical) => {
            return <div key={radical}>{radical.toUpperCase()}</div>;
          })}
        </section>
        <Character
          shouldTransition={shouldTransition}
          currentRadicalStatus={currentRadicalStatus}
          character={randomRadicals[currentRadicalIndex]}
        />
      </main>
      <div className="flex flex-col items-center absolute bottom-[10vh] left-1/2 -translate-x-1/2 gap-6">
        <section>
          <div className="flex flex-row gap-2 items-end">
            {[...word].map((char, index) => (
              <div
                key={`${char}-${currentRadicalIndex}`}
                className="flex flex-col items-center"
              >
                <div className="text-gray-900 text-[40px] -pb-2">
                  {inputKeys[index]}
                </div>
                <div className="w-6 h-[3px] rounded-full bg-gray-600" />
              </div>
            ))}
          </div>
        </section>
        <AmountSelector
          amounts={amounts}
          amount={amount}
          setAmount={setAmount}
        />
      </div>
    </>
  );
}
