import React, { useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategory, setCurrentCategory] = useState(category[0]);
  const [record, setRecord] = useState({ speed: 75, accuracy: 0.9 });
  const [currentRadicalIndex, setCurrentRadicalIndex] = useState(1);

  const handleKeyDown = (e) => {
    if (Object.values(Radicals)[currentRadicalIndex] === e.key) {
      setCurrentRadicalIndex((prev) => prev + 1);
    }
  };
  useKeyDownHandler(handleKeyDown, [currentRadicalIndex]);

  return (
    <>
      <section className="mt-4 flex flex-row items-center justify-center gap-4">
        <Record speed={record.speed} accuracy={record.accuracy} />
        <PracticeCategory
          category={category}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      </section>
      <main className="mt-2">
        {/*TODO: hover to display speed and accuracy, color to indicate proficiency*/}
        <div className="flex flex-row gap-4 justify-center text-2xl">
          {Object.keys(Radicals).map((raidcal) => {
            return <div key={raidcal}>{raidcal}</div>;
          })}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[500px] cursor-default">
          {Object.keys(Radicals)[currentRadicalIndex]}
        </div>
      </main>
    </>
  );
}
