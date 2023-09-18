import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(Radicals) {
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
  const inputRef = useRef([]);
  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const currentKeyIndexRef = useRef(0);

  const reset = (newWordJSON) => {
    setCurrentRadicalIndex(0);
    setTime(0);
    setWrongRadicals(new Map());
    setRandomRadicals(getRandomRadicals(newWordJSON));
    setWordJSON(newWordJSON);
    currentKeyIndexRef.current = 0; // Reset the key index
    inputRef.current = []; // Reset the input
  };

  const getTargetValue = (index) => {
    // prettier-ignore
    const targetValueParts = wordJSON[randomRadicals[index]].split(" ");
    const targetValue = targetValueParts[targetPart];
    return targetValue;
  };

  const handleKeyDown = (e) => {
    // start case
    if (currentRadicalIndex === 0) {
      setIsRunning(true);
    }

    // end case
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
    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    const targetValue = getTargetValue(currentRadicalIndex);

    inputRef.current[currentKeyIndexRef.current] = e.key.toLowerCase();
    // Force update to re-render with new input
    inputRef.current = [...inputRef.current];

    // incorrect
    if (targetValue[currentKeyIndexRef.current] !== e.key.toLowerCase()) {
      setWrongRadicals((prev) => prev.set(currentRadicalIndex, e.key));
      setCurrentRadicalStatus(() => "wrong");
      return;
    }

    // correct
    if (currentKeyIndexRef.current === targetValue.length - 1) {
      // Wait 60ms
      // await new Promise((resolve) => setTimeout(resolve, 60));
      setAnswer(getTargetValue(currentRadicalIndex + 1));
      setCurrentRadicalIndex((prev) => prev + 1);
      inputRef.current = []; // Reset the input
      setCurrentRadicalStatus(() => "default");
      setShouldTransition(true); // Set to true to enable transition
      currentKeyIndexRef.current = 0; // Reset the key index
    } else {
      setCurrentRadicalStatus(() => "default");
      currentKeyIndexRef.current++; // Increment the key index
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
    input: inputRef.current, // Return the input as a ref
  };
}

export default useCharacterHelper;
