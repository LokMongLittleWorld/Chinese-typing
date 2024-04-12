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
  const [wordLength, setWordLength] = useState([]);
  const [sumOfWordLength, setSumOfWordLength] = useState(0);
  const [wrongWords, setWrongWords] = useState(new Map());
  const targetPartRef = useRef(0);
  const [answerMap, setAnswerMap] = useState(new Map());
  const inputRef = useRef([]);
  const inputIndexRef = useRef(0);

  const { time, setTime, isRunning, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();

  const reset = (newWordJSON) => {
    // game reset based on new wordJSON
    setCurrentWordIndex(0);
    setTime(0);
    setWrongWords(new Map());
    handleRandomWords(newWordJSON);
    setWordJSON(newWordJSON);
    currentWordStatusRef.current = "default";
    setIsRunning(false);
    inputIndexRef.current = 0; // Reset the key index
    inputRef.current = []; // Reset the input
  };

  const handleKeyDown = (e) => {
    // handle keydown event

    // start, initialize the timer
    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    //press space bar to go to the next word
    // prettier-ignore
    if (currentWordStatusRef.current === "correct" && " " === e.key.toLowerCase()
    ) {
      nextWord();
      return;
    } else if (currentWordStatusRef.current === "correct" && " " !== e.key.toLowerCase()
    )
      return;

    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    const targetValue = answerMap.get(randomWords[currentWordIndex]);
    inputRef.current[inputIndexRef.current] = e.key.toLowerCase();

    // incorrect
    if (targetValue[inputIndexRef.current] !== e.key.toLowerCase()) {
      setWrongWords((prev) => prev.set(currentWordIndex, e.key));
      currentWordStatusRef.current = "wrong";
      return;
    }

    // correct
    if (inputIndexRef.current + 1 === targetValue.length) {
      // single input
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
    if (currentWordIndex === sumOfWordLength - 1) {
      endGame();
      return;
    }
    inputRef.current = []; // Reset the input
    inputIndexRef.current = 0; // Reset the key index
    setCurrentWordIndex((prev) => prev + 1);
    currentWordStatusRef.current = "default";
  };

  const endGame = () => {
    setIsRunning(false);
    setRecord({
      speed: speed(sumOfWordLength, time),
      accuracy: accuracy(sumOfWordLength, wrongWords.size),
    });
    reset(wordJSON);
  };

  //1. generate RandomWordsArr
  //2. generate answer map
  //3. generate wordLengthArr
  const handleRandomWords = (newWordJSON) => {
    // wordEntries represents the key-value pair array of the newWordJSON
    const wordEntries = Object.entries(newWordJSON);
    const selectedWords = [];
    const wordLengthTmp = [];
    const answerMapTmp = new Map();

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * wordEntries.length);
      const randomWordEntry = wordEntries[randomIndex];

      // randomWordEntry[0] is the key, randomWordEntry[1] is the value
      if (randomWordEntry[0].length === 1) {
        selectedWords.push(randomWordEntry[0]);
        wordLengthTmp.push(randomWordEntry[0].length);
        answerMapTmp.set(randomWordEntry[0], randomWordEntry[1]);
      } else {
        const words = Array.from(randomWordEntry[0]);
        const values = randomWordEntry[1].split(" ");
        wordLengthTmp.push(words.length);
        for (let j = 0; j < words.length; j++) {
          selectedWords.push(words[j]);
          answerMapTmp.set(words[j], values[j]);
        }
      }

      setRandomWords(selectedWords);
      setWordLength(wordLengthTmp);
      setAnswerMap(answerMapTmp);
      setSumOfWordLength(wordLengthTmp.reduce((a, b) => a + b, 0));
    }
  };

  useEffect(() => {
    handleRandomWords(wordJSON);
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
    wrongWords,
    time,
    setAmount,
    setTime,
    answerMap,
    targetPartRef,
    isRunning,
    input: inputRef.current, // Return the input as a ref
  };
}

export default useCharacterHelper;
