import React, { useEffect, useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategory, setCurrentCategory] = useState(category[0]);
  const [record, setRecord] = useState({ speed: 75, accuracy: 0.9 });
  const [currentRadicalIndex, setCurrentRadicalIndex] = useState(0);
  const [currentRadicalStatus, setCurrentRadicalStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amount, setAmount] = useState(20);
  const [randomRadicals, setRandomRadicals] = useState([]);

  const getRandomRadicals = () => {
    const radicalKeys = Object.keys(Radicals);
    const shuffledRadicals = radicalKeys.sort(() => 0.5 - Math.random());
    const selectedRadicals = shuffledRadicals.slice(0, amount);
    return selectedRadicals;
  };

  useEffect(() => {
    const initialRandomRadicals = getRandomRadicals();
    setRandomRadicals(initialRandomRadicals);
  }, [amount]);

  const handleKeyDown = async (e) => {
    if (currentRadicalIndex === amount) {
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      if (
        Radicals[randomRadicals[currentRadicalIndex]] === e.key.toLowerCase()
      ) {
        setCurrentRadicalStatus("correct");
        // Wait 60ms
        await new Promise((resolve) => setTimeout(resolve, 60));
        setCurrentRadicalIndex((prev) => prev + 1);
        setCurrentRadicalStatus("default");
        setShouldTransition(true); // Set to true to enable transition
      } else {
        setCurrentRadicalStatus("wrong");
      }
    }
  };

  useEffect(() => {
    setShouldTransition(false);
  }, [currentRadicalIndex]);

  useKeyDownHandler(handleKeyDown, [currentRadicalIndex, randomRadicals]);
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
        {/* TODO: hover to display speed and accuracy, color to indicate proficiency */}
        <div className="flex flex-row gap-4 justify-center text-2xl">
          {Object.keys(Radicals).map((radical) => {
            return <div key={radical}>{radical}</div>;
          })}
        </div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[500px] cursor-default
          ${
            shouldTransition ? "transition-colors duration-500 ease-in-out" : ""
          }
          ${
            currentRadicalStatus === "correct"
              ? "text-black"
              : currentRadicalStatus === "wrong"
              ? "text-rose-400"
              : "text-gray-500"
          }`}
        >
          {randomRadicals[currentRadicalIndex]}
        </div>
      </main>
    </>
  );
}
