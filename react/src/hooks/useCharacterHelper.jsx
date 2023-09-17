import { useEffect, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(Radicals) {
  let currentKeyIndex = 0;
  const [wordJSON, setWordJSON] = useState(Radicals);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentRadicalIndex, setCurrentRadicalIndex] = useState(0);
  const [currentRadicalStatus, setCurrentRadicalStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([25, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomRadicals, setRandomRadicals] = useState([]);
  const [wrongRaidcals, setWrongRadicals] = useState(new Map());
  const [targetPart, setTargetPart] = useState(0);
  const [answer, setAnswer] = useState("");
  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const reset = (newWordJSON) => {
    setCurrentRadicalIndex(0);
    setTime(0);
    setWrongRadicals(new Map());
    setRandomRadicals(getRandomRadicals(newWordJSON));
    setWordJSON(newWordJSON);
  };

  const getTargetValue = (index) => {
    //prettier-ignore
    const targetValueParts = wordJSON[randomRadicals[index]].split(" ");
    const targetValue = targetValueParts[targetPart];
    return targetValue;
  };
  const handleKeyDown = async (e) => {
    //start case
    if (currentRadicalIndex === 0) {
      setIsRunning(true);
    }
    //end case
    if (currentRadicalIndex === amount - 1) {
      setIsRunning(false);
      setRecord({
        speed: speed(amount, time),
        accuracy: accuracy(amount, wrongRaidcals.size),
      });
      setCurrentRadicalIndex(0);
      setTime(0);
      setWrongRadicals(new Map());
      setRandomRadicals(getRandomRadicals(wordJSON));
      return;
    }
    //neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }
    const targetValue = getTargetValue(currentRadicalIndex);

    // incorrect
    if (targetValue[currentKeyIndex] !== e.key.toLowerCase()) {
      setWrongRadicals((prev) => prev.set(currentRadicalIndex, e.key));
      setCurrentRadicalStatus(() => "wrong");
      return;
    }

    // correct
    if (currentKeyIndex === targetValue.length - 1) {
      // Wait 60ms
      // await new Promise((resolve) => setTimeout(resolve, 60));
      setAnswer(getTargetValue(currentRadicalIndex + 1));
      setCurrentRadicalIndex((prev) => prev + 1);
      setCurrentRadicalStatus(() => "default");
      setShouldTransition(true); // Set to true to enable transition
    } else {
      setCurrentRadicalStatus(() => "default");
      currentKeyIndex++;
    }
  };
  const getRandomRadicals = (radicals) => {
    const radicalKeys = Object.keys(radicals);
    const selectedRadicals = [];
    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * radicalKeys.length);
      selectedRadicals.push(radicalKeys[randomIndex]);
    }
    return selectedRadicals;
  };

  useEffect(() => {
    const initialRandomRadicals = getRandomRadicals(Radicals);
    setRandomRadicals(initialRandomRadicals);
    const targetValueParts = Radicals[initialRandomRadicals[0]].split(" ");
    setAnswer(targetValueParts[targetPart]);
  }, [amount]);

  useEffect(() => {
    setShouldTransition(false);
  }, [currentRadicalIndex]);
  return {
    handleKeyDown,
    reset,
    record,
    currentRadicalIndex,
    currentRadicalStatus,
    shouldTransition,
    amounts,
    amount,
    randomRadicals,
    wrongRaidcals,
    time,
    setAmount,
    setTime,
    isRunning,
    answer,
  };
}
export default useCharacterHelper;
