import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(JSON) {
  const [wordJSON, setWordJSON] = useState(JSON);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordStatusRef = useRef("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([5, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomWords, setRandomWords] = useState([]);
  const [wrongRadicals, setWrongRadicals] = useState(new Map());
  const [targetPart, setTargetPart] = useState(0);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef([]);
  const inputIndexRef = useRef(0);

  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const reset = (newWordJSON) => {
    // game reset based on new wordJSON
    setCurrentWordIndex(0);
    setTime(0);
    setWrongRadicals(new Map());
    const newRandomWords = getRandomRadicals(newWordJSON);
    setRandomWords(newRandomWords);
    setAnswer(newWordJSON[newRandomWords[0]].split(" ")[0]);
    setWordJSON(newWordJSON);
    currentWordStatusRef.current = "default";
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

    //press space bar to go to the next word
    if (
      currentWordStatusRef.current === "correct" &&
      " " === e.key.toLowerCase()
    ) {
      nextWord();
      return;
    } else if (
      currentWordStatusRef.current === "correct" &&
      " " !== e.key.toLowerCase()
    )
      return;

    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    const targetValue = getTargetValue(currentWordIndex);
    inputRef.current[inputIndexRef.current] = e.key.toLowerCase();

    // incorrect
    if (targetValue[inputIndexRef.current] !== e.key.toLowerCase()) {
      setWrongRadicals((prev) => prev.set(currentWordIndex, e.key));
      currentWordStatusRef.current = "wrong";
      return;
    }

    // correct
    if (inputIndexRef.current + 1 === targetValue.length) {
      if (targetValue.length === 1) {
        nextWord();
        return;
      }
      currentWordStatusRef.current = "correct";
    } else {
      currentWordStatusRef.current = "default";
      inputIndexRef.current++; // Increment the key index
    }
  };

  const nextWord = () => {
    if (currentWordIndex === amount - 1) {
      endGame();
      return;
    }
    inputRef.current = []; // Reset the input
    inputIndexRef.current = 0; // Reset the key index
    setAnswer(getTargetValue(currentWordIndex + 1));
    setCurrentWordIndex((prev) => prev + 1);
    currentWordStatusRef.current = "default";
  };

  const endGame = () => {
    setIsRunning(false);
    setRecord({
      speed: speed(amount, time),
      accuracy: accuracy(amount, wrongRadicals.size),
    });
    reset(wordJSON);
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
    currentWordStatus: currentWordStatusRef.current,
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
