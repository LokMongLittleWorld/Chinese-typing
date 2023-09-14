import React, { useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import Initials from "../../../static/jyutping/initials.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";
import useCharacterHelper from "../../hooks/useCharacterHelper.jsx";
import Character from "../../Components/Character.jsx";
import AmountSelector from "../../Components/AmountSelector.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategory, setCurrentCategory] = useState(
    localStorage.getItem("currentCategory") || category[0]
  );
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
  } = useCharacterHelper(Radicals);
  useKeyDownHandler(handleKeyDown, [currentRadicalIndex, randomRadicals]);

  const handleCategoryChange = (category) => {
    // TODO: dynamic import
    setCurrentCategory(category);
    localStorage.setItem("currentCategory", category);
    if (category === "字根訓練") reset(Radicals);
    if (category === "字形訓練") reset(Initials);
    if (category === "單字訓練") reset(Radicals);
  };

  return (
    <>
      <section className="mt-4 flex flex-row items-center justify-center gap-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
        <PracticeCategory
          category={category}
          currentCategory={currentCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </section>
      <main className="mt-2">
        {/* TODO: hover to display speed and accuracy, color to indicate proficiency */}
        <div className="flex flex-row gap-4 justify-center text-2xl">
          {Object.keys(Radicals).map((radical) => {
            return <div key={radical}>{radical}</div>;
          })}
        </div>
        <Character
          shouldTransition={shouldTransition}
          currentRadicalStatus={currentRadicalStatus}
          character={randomRadicals[currentRadicalIndex]}
        />
      </main>
      <AmountSelector amounts={amounts} amount={amount} setAmount={setAmount} />
    </>
  );
}
