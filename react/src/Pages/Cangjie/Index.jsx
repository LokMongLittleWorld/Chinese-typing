import React, { useEffect, useState } from "react";
import Record from "../../Components/Record.jsx";
import PracticeCategory from "../../Components/PracticeCategory.jsx";
import Radicals from "../../../static/cangjie/radicals.json";
import useKeyDownHandler from "../../hooks/useKeyDownHandler.jsx";
import useTimer from "../../hooks/useTimer.jsx";
import useRecorder from "../../hooks/useRecorder.jsx";

export default function Index() {
  const category = ["字根訓練", "字形訓練", "單字訓練"];
  const [currentCategory, setCurrentCategory] = useState(category[0]);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentRadicalIndex, setCurrentRadicalIndex] = useState(0);
  const [currentRadicalStatus, setCurrentRadicalStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([25, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomRadicals, setRandomRadicals] = useState([]);
  const { time, setTime, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();
  const [wrongRaidcals, setWrongRadicals] = useState(new Map());

  const getRandomRadicals = (radicals) => {
    const radicalKeys = Object.keys(radicals);
    const shuffledRadicals = radicalKeys.sort(() => 0.5 - Math.random());
    const selectedRadicals = shuffledRadicals.slice(0, amount);
    return selectedRadicals;
  };

  useEffect(() => {
    const initialRandomRadicals = getRandomRadicals(Radicals);
    setRandomRadicals(initialRandomRadicals);
  }, [amount]);

  const handleKeyDown = async (e) => {
    if (currentRadicalIndex === 0) {
      setIsRunning(true);
    }
    if (currentRadicalIndex === amount - 1) {
      setIsRunning(false);
      setRecord({
        speed: speed(amount, time),
        accuracy: accuracy(amount, wrongRaidcals.size),
      });
      setCurrentRadicalIndex(0);
      setTime(0);
      setWrongRadicals(new Map());
      setRandomRadicals(getRandomRadicals(Radicals));
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      if (
        Radicals[randomRadicals[currentRadicalIndex]] === e.key.toLowerCase()
      ) {
        setCurrentRadicalStatus(() => "correct");
        // Wait 60ms
        // await new Promise((resolve) => setTimeout(resolve, 60));
        setCurrentRadicalIndex((prev) => prev + 1);
        setCurrentRadicalStatus(() => "default");
        setShouldTransition(true); // Set to true to enable transition
      } else {
        // TODO: turn wrongAmount to array, store wrong radicals
        setWrongRadicals((prev) => prev.set(currentRadicalIndex, e.key));
        setCurrentRadicalStatus(() => "wrong");
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
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] xl:text-[400px] 2xl:text-[500px] cursor-default select-none -z-10
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
      <section className="absolute bottom-[12vh] left-1/2 -translate-x-1/2">
        <div className="flex flex-row items-center bg-gray-200 gap-6 py-1 px-2 rounded-lg">
          {amounts.map((item) => {
            return (
              <div
                onClick={() => setAmount(item)}
                className={`text-2xl cursor-pointer ${
                  amount === item ? "text-blue-500" : "text-gray-700"
                }`}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
