import { useEffect, useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

const RadicalRecordTemplate = {
  NumberOfPlay: 0,
  Record: {
    a: {
      speed: 0,
      numberOfPress: 0,
    },
    b: {
      speed: 0,
      numberOfPress: 0,
    },
    c: {
      speed: 0,
      numberOfPress: 0,
    },
    d: {
      speed: 0,
      numberOfPress: 0,
    },
    e: {
      speed: 0,
      numberOfPress: 0,
    },
    f: {
      speed: 0,
      numberOfPress: 0,
    },
    g: {
      speed: 0,
      numberOfPress: 0,
    },
  },
};

function useCharacterHelper(JSON) {
  const [wordJSON, setWordJSON] = useState(JSON);
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [radicalRecord, setRadicalRecord] = useState(RadicalRecordTemplate);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordStatusRef = useRef("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amounts, setAmounts] = useState([5, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomWords, setRandomWords] = useState([]);
  const [accWordLength, setAccWordLength] = useState([]);
  const [wrongWords, setWrongWords] = useState(new Map());
  const targetPartRef = useRef(0);
  const [answerMap, setAnswerMap] = useState(new Map());
  const inputRef = useRef(null);
  const inputIndexRef = useRef(0);
  const [inputDisplay, setInputDisplay] = useState([]);

  const { time, isRunning, setIsRunning, getTimeInterval } = useTimer();
  const { speed, accuracy } = useRecorder();

  const reset = (newWordJSON) => {
    // game reset based on new wordJSON
    setCurrentWordIndex(0);
    setWrongWords(new Map());
    handleRandomWords(newWordJSON);
    setWordJSON(newWordJSON);
    currentWordStatusRef.current = "default";
    setIsRunning(false);
    inputIndexRef.current = 0; // Reset the key index
    inputRef.current = null; // Reset the input
    setInputDisplay([]);
  };

  const handleKeyDown = (e) => {
    // handle keydown event

    // start, initialize the timer
    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    if (e.key === "Tab") {
      e.preventDefault();
      setShowModal((prevState) => !prevState);
      return;
    }

    //press space bar to go to the next word
    // prettier-ignore
    if(handleSpaceBarPress(e)) return;

    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }
    const targetValue = answerMap.get(randomWords[currentWordIndex]);
    const currentInputIndex = inputIndexRef.current;
    setInputDisplay((prev) => {
      const updatedDisplay = [...prev];
      updatedDisplay[currentInputIndex] = e.key;
      return updatedDisplay;
    });

    // incorrect
    if (targetValue[inputIndexRef.current] !== e.key.toLowerCase()) {
      setWrongWords((prev) => prev.set(currentWordIndex, e.key));
      currentWordStatusRef.current = "wrong";
      return;
    }

    // correct
    // case 1: multiple inputs, not the last character
    if (inputIndexRef.current + 1 < targetValue.length) {
      currentWordStatusRef.current = "default";
      inputIndexRef.current++;
      return;
    }
    // case 2: single inputa
    if (targetValue.length === 1) {
      handleRadicalRecord(targetValue);
      nextWord();
      return;
    }
    // case 3: multiple inputs, the last character
    currentWordStatusRef.current = "correct";
  };

  const handleRadicalRecord = (targetValue) => {
    const currentRadicalRecord = radicalRecord?.Record[targetValue];
    if (getTimeInterval() === 0) return;
    setRadicalRecord((prev) => {
      const updatedRecord = { ...prev };
      updatedRecord.Record[targetValue] = {
        speed: speed(1, getTimeInterval()),
        numberOfPress: currentRadicalRecord.numberOfPress + 1,
      };
      return updatedRecord;
    });
  };

  const nextWord = () => {
    if (currentWordIndex === accWordLength[accWordLength.length - 1] - 1) {
      console.log(radicalRecord);
      endGame();
      return;
    }
    inputRef.current = [];
    setInputDisplay([]);
    inputIndexRef.current = 0;
    setCurrentWordIndex((prev) => prev + 1);
    currentWordStatusRef.current = "default";
  };

  const endGame = () => {
    setIsRunning(false);
    // prettier-ignore
    setRecord({
      speed: speed(accWordLength[accWordLength.length - 1], time),
      accuracy: accuracy(accWordLength[accWordLength.length - 1], wrongWords.size),
    });
    reset(wordJSON);
  };

  const handleSpaceBarPress = (e) => {
    if (currentWordStatusRef.current !== "correct") return false;

    if (" " === e.key.toLowerCase()) {
      nextWord();
      return true;
    }

    return true;
  };

  //1. generate RandomWordsArr
  //2. generate answer map
  //3. generate wordLengthArr
  const handleRandomWords = (newWordJSON) => {
    // wordEntries represents the key-value pair array of the newWordJSON
    const wordEntries = Object.entries(newWordJSON);
    const selectedWords = [];
    const accWordLengthTmp = [];
    const answerMapTmp = new Map();

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * wordEntries.length);
      const randomWordEntry = wordEntries[randomIndex];
      const currentWordLength =
        accWordLengthTmp[accWordLengthTmp.length - 1] || 0;

      // randomWordEntry[0] is the key, randomWordEntry[1] is the value
      if (randomWordEntry[0].length === 1) {
        selectedWords.push(randomWordEntry[0]);
        accWordLengthTmp.push(currentWordLength + randomWordEntry[0].length);
        answerMapTmp.set(randomWordEntry[0], randomWordEntry[1]);
      } else {
        const words = Array.from(randomWordEntry[0]);
        const values = randomWordEntry[1].split(" ");
        accWordLengthTmp.push(currentWordLength + words.length);
        for (let j = 0; j < words.length; j++) {
          selectedWords.push(words[j]);
          answerMapTmp.set(words[j], values[j]);
        }
      }
      setRandomWords(selectedWords);
      setAccWordLength(accWordLengthTmp);
      setAnswerMap(answerMapTmp);
    }
  };

  const handleAmountChange = (item) => {
    setAmount(item);
    handleRandomWords(wordJSON);
  };

  useEffect(() => {
    handleRandomWords(wordJSON);
  }, []);

  return {
    handleKeyDown,
    handleAmountChange,
    reset,
    record,
    currentWordIndex,
    currentWordStatus: currentWordStatusRef.current,
    shouldTransition,
    amounts,
    amount,
    randomWords,
    wrongWords,
    setAmount,
    showModal,
    setShowModal,
    answerMap,
    accWordLength,
    isRunning,
    inputRef,
    inputDisplay,
  };
}

export default useCharacterHelper;
