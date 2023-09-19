import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(JSON) {
  const [wordJSON, setWordJSON] = useState(JSON);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordStatus, setCurrentWordStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([25, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomWords, setRandomWords] = useState([]);
  const [wrongRadicals, setWrongRadicals] = useState(new Map());
  const [targetPart, setTargetPart] = useState(0);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef([]);
  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const currentKeyIndexRef = useRef(0);

  const reset = (newWordJSON) => {
    setCurrentWordIndex(0);
    setTime(0);
    setWrongRadicals(new Map());
    setRandomWords(getRandomRadicals(newWordJSON));
    setWordJSON(newWordJSON);
    currentKeyIndexRef.current = 0; // Reset the key index
    inputRef.current = []; // Reset the input
  };

  const getTargetValue = (index) => {
    // prettier-ignore
    const targetValueParts = wordJSON[randomWords[index]].split(" ");
    const targetValue = targetValueParts[targetPart];
    return targetValue;
  };

  const handleKeyDown = (e) => {
    // start case
    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    // end case
    if (currentWordIndex === amount - 1) {
      setIsRunning(false);
      setRecord({
        speed: speed(amount, time),
        accuracy: accuracy(amount, wrongRadicals.size),
      });
      setCurrentWordIndex(0);
      setTime(0);
      setWrongRadicals(new Map());
      setRandomWords(getRandomRadicals(wordJSON));
      return;
    }
    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    const targetValue = getTargetValue(currentWordIndex);

    inputRef.current[currentKeyIndexRef.current] = e.key.toLowerCase();
    // Force update to re-render with new input
    inputRef.current = [...inputRef.current];

    // incorrect
    if (targetValue[currentKeyIndexRef.current] !== e.key.toLowerCase()) {
      setWrongRadicals((prev) => prev.set(currentWordIndex, e.key));
      setCurrentWordStatus(() => "wrong");
      return;
    }

    // correct
    if (currentKeyIndexRef.current === targetValue.length - 1) {
      // Wait 60ms
      // await new Promise((resolve) => setTimeout(resolve, 60));
      setAnswer(getTargetValue(currentWordIndex + 1));
      setCurrentWordIndex((prev) => prev + 1);
      inputRef.current = []; // Reset the input
      setCurrentWordStatus(() => "default");
      setShouldTransition(true); // Set to true to enable transition
      currentKeyIndexRef.current = 0; // Reset the key index
    } else {
      setCurrentWordStatus(() => "default");
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
    const initialRandomRadicals = getRandomRadicals(JSON);
    setRandomWords(initialRandomRadicals);
    const targetValueParts = JSON[initialRandomRadicals[0]].split(" ");
    setAnswer(targetValueParts[targetPart]);
  }, [amount]);

  useEffect(() => {
    setShouldTransition(false);
  }, [currentWordIndex]);

  return {
    handleKeyDown,
    reset,
    record,
    currentWordIndex,
    currentWordStatus,
    shouldTransition,
    amounts,
    amount,
    randomWords,
    wrongRadicals,
    time,
    setAmount,
    setTime,
    isRunning,
    answer,
    input: inputRef.current, // Return the input as a ref
  };
}

export default useCharacterHelper;
