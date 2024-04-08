import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(JSON) {
  const [wordJSON, setWordJSON] = useState(JSON);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordStatus, setCurrentWordStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([5, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomWords, setRandomWords] = useState([]);
  const [wrongRadicals, setWrongRadicals] = useState(new Map());
  const [targetPart, setTargetPart] = useState(0);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef([]);
  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const inputIndexRef = useRef(0);

  const reset = (newWordJSON) => {
    // game reset based on new wordJSON
    setCurrentWordIndex(0);
    setTime(0);
    setWrongRadicals(new Map());
    const newRandomWords = getRandomRadicals(newWordJSON);
    setRandomWords(newRandomWords);
    setAnswer(newWordJSON[newRandomWords[0]].split(" ")[0]);
    setWordJSON(newWordJSON);
    setCurrentWordStatus("default");
    setIsRunning(false);
    inputIndexRef.current = 0; // Reset the key index
    inputRef.current = []; // Reset the input
  };

  const getTargetValue = (index) => {
    // get target value (the answer of the current word based on the index)
    // prettier-ignore
    const targetValueParts = wordJSON[randomWords[index]].split(" ");
    const targetValue = targetValueParts[targetPart];
    return targetValue;
  };

  const handleKeyDown = (e) => {
    // handle keydown event

    // start case, initialize the timer
    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    const targetValue = getTargetValue(currentWordIndex);

    inputRef.current[inputIndexRef.current] = e.key.toLowerCase();

    // incorrect
    if (targetValue[inputIndexRef.current] !== e.key.toLowerCase()) {
      setWrongRadicals((prev) => prev.set(currentWordIndex, e.key));
      setCurrentWordStatus(() => "wrong");
      return;
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
      setCurrentWordStatus("default");
      setRandomWords(getRandomRadicals(wordJSON));
      return;
    }

    // correct
    if (inputIndexRef.current + 1 === targetValue.length) {
      setAnswer(getTargetValue(currentWordIndex + 1));
      setCurrentWordIndex((prev) => prev + 1);
      inputRef.current = []; // Reset the input
      inputIndexRef.current = 0; // Reset the key index
      setCurrentWordStatus(() => "default");
    } else {
      setCurrentWordStatus(() => "default");
      inputIndexRef.current++; // Increment the key index
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
