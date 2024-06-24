import { useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import RadicalSWithCategory from "../../static/cangjie/radicals_with_category.json";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(words, _keysRecord, _keysRecordName) {
  // game play logic
  const [wordJSON, setWordJSON] = useState(words);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(
    localStorage.getItem("currentCategoryIndex") || 0
  );
  const inputIndexRef = useRef(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [randomWords, setRandomWords] = useState([]);
  const [answerMap, setAnswerMap] = useState(new Map());

  // word amount
  const [amounts, setAmounts] = useState([5, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);

  // display
  const [showModal, setShowModal] = useState(false);
  const [accWordLength, setAccWordLength] = useState([]);
  const [inputDisplay, setInputDisplay] = useState([]);
  const currentWordStatusRef = useRef("default");

  // record
  const [record, setRecord] = useState({ speed: 0, accuracy: 0 });
  const { time, isRunning, setIsRunning, getTimeInterval } = useTimer();
  const { speed, accuracy } = useRecorder();
  const [wrongWords, setWrongWords] = useState(new Map());

  // Cangjie, keysRecord related
  const [keysRecord, setKeysRecord] = useState(_keysRecord);
  const [keysRecordName, setKeysRecordName] = useState(_keysRecordName);
  const currentCategory = useRef(_keysRecord?.CurrentCategory || 0);
  const radicalSWithCategory = Object.entries(RadicalSWithCategory);

  const handleKeyDown = (e) => {
    // handle keydown event
    if (e.key === "Tab") {
      e.preventDefault();
      setShowModal((prevState) => !prevState);
      return;
    }

    // press enter to start the game
    if (!isRunning && e.key === "Enter") {
      setIsRunning(true);
      return;
    } else if (!isRunning) {
      return;
    }

    // press space bar to go to the next word
    if (handleSpaceBarPress(e)) return;

    // neglect non-alphabet
    if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }

    // display the input
    const currentInputIndex = inputIndexRef.current;
    setInputDisplay((prev) => {
      const updatedDisplay = [...prev];
      updatedDisplay[currentInputIndex] = e.key;
      return updatedDisplay;
    });

    // get answer
    const answer = answerMap.get(randomWords[currentWordIndex]);

    // incorrect
    if (answer[inputIndexRef.current] !== e.key.toLowerCase()) {
      setWrongWords((prev) => prev.set(currentWordIndex, e.key));
      currentWordStatusRef.current = "wrong";
      return;
    }

    // correct
    // case 1: multiple inputs, not the last character
    if (inputIndexRef.current + 1 < answer.length) {
      currentWordStatusRef.current = "default";
      inputIndexRef.current++;
      return;
    }
    // case 2: single input
    if (answer.length === 1) {
      if (keysRecord) {
        handleKeysRecord(answer);
      }
      nextWord();
      return;
    }
    // case 3: multiple inputs, the last character
    currentWordStatusRef.current = "correct";
  };

  const handleKeysRecord = (answer) => {
    if (getTimeInterval() === 0) return;
    const currentRadicalRecord = keysRecord?.Record[answer];
    setKeysRecord((prev) => {
      const updatedRecord = { ...prev };
      updatedRecord.Record[answer] = {
        speed: speed(1, getTimeInterval()),
        numberOfPress: (currentRadicalRecord?.numberOfPress || 0) + 1,
      };
      return updatedRecord;
    });
  };

  const nextWord = () => {
    //end game
    if (currentWordIndex === accWordLength[accWordLength.length - 1] - 1) {
      endGame();
      return;
    }
    setInputDisplay([]);
    inputIndexRef.current = 0;
    setCurrentWordIndex((prev) => prev + 1);
    currentWordStatusRef.current = "default";
  };

  const reset = (newWordJSON, newKeyRecord, newKeyRecordName) => {
    // game reset based on new wordJSON

    // handle record reset for the new category
    if (currentCategoryIndex !== localStorage.getItem("currentCategoryIndex")) {
      setRecord({ speed: 0, accuracy: 0 });
    }

    // handle key record
    if (newKeyRecord) {
      setKeysRecord(newKeyRecord);
      setKeysRecordName(newKeyRecordName);
    } else {
      setKeysRecord(null);
      setKeysRecordName(null);
    }
    setCurrentWordIndex(0);
    setWrongWords(new Map());
    handleRandomWords(newWordJSON);
    setWordJSON(newWordJSON);
    currentWordStatusRef.current = "default";
    setIsRunning(false);
    inputIndexRef.current = 0;
    setInputDisplay([]);
  };

  const endGame = () => {
    setIsRunning(false);
    let updatedRecord = null;

    if (keysRecord) {
      updatedRecord = { ...keysRecord };
      updatedRecord.NumberOfPlay++;

      // case: not all categories are finished
      if (
        updatedRecord.CurrentCategory < Object.keys(wordJSON).length &&
        isNestObject(wordJSON)
      ) {
        // get average speed of the current category
        const currentCategoryKeys = Object.values(
          radicalSWithCategory[keysRecord.CurrentCategory][1]
        );
        let isNextCategory = true;
        //TODO: test
        for (let i = 0; i < currentCategoryKeys.length; i++) {
          // if (
          //   (keysRecord?.Record[currentCategoryKeys[i]]?.speed || 0) < 80
          //   // || keysRecord.Record[currentCategoryKeys[i]].numberOfPress < 5
          // ) {
          //   isNextCategory = false;
          //   break;
          // }
        }
        if (isNextCategory) {
          updatedRecord.CurrentCategory++;
          currentCategory.current++;
        }
      }
      setKeysRecord(updatedRecord);
      localStorage.setItem(keysRecordName, JSON.stringify(updatedRecord));
    }

    // update record
    // prettier-ignore
    setRecord({
      speed: speed(accWordLength[accWordLength.length - 1], time),
      accuracy: accuracy(accWordLength[accWordLength.length - 1], wrongWords.size),
    });
    reset(wordJSON, updatedRecord, keysRecordName);
  };

  const handleSpaceBarPress = (e) => {
    if (currentWordStatusRef.current !== "correct") return false;

    " " === e.key.toLowerCase() && nextWord();
    return true;
  };

  //1. generate RandomWordsArr
  //2. generate answer map
  //3. generate wordLengthArr
  const handleRandomWords = (newWordJSON) => {
    // if the newWordJSON is a nested object, calculate the mainWordEntries and subWordEntries based on the currentCategory
    const { mainWordEntries, subWordEntries } =
      handleWordJSONToWordEntries(newWordJSON);

    // wordEntries represents the key-value pair array of the newWordJSON
    // prettier-ignore
    const selectedWords = [];
    const accWordLengthTmp = [];
    const answerMapTmp = new Map();

    for (let i = 0; i < amount; i++) {
      let randomWordEntry;
      // 70% from the mainWordEntries, 30% from the subWordEntries
      if (Math.random() < 0.3) {
        const randomIndex = Math.floor(Math.random() * subWordEntries.length);
        randomWordEntry = subWordEntries[randomIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * mainWordEntries.length);
        randomWordEntry = mainWordEntries[randomIndex];
      }
      const currentWordLength =
        accWordLengthTmp[accWordLengthTmp.length - 1] || 0;

      // avoid continuously selecting the same word twice
      if (
        subWordEntries.length > 1 &&
        mainWordEntries.length > 1 &&
        selectedWords[selectedWords.length - 1] === randomWordEntry[0]
      ) {
        i--;
        continue;
      }

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
    }
    setRandomWords(selectedWords);
    setAccWordLength(accWordLengthTmp);
    setAnswerMap(answerMapTmp);
  };

  const isNestObject = (obj) => {
    const firstKey = Object.keys(obj)[0];
    return typeof obj[firstKey] === "object" && obj[firstKey] !== null;
  };

  const handleWordJSONToWordEntries = (wordJSON) => {
    let mainWordEntries = [];
    let subWordEntries = [];

    if (!isNestObject(wordJSON)) {
      mainWordEntries = Object.entries(wordJSON);
      subWordEntries = Object.entries(wordJSON);
      return { mainWordEntries, subWordEntries };
    }

    // is a nested object

    // handle subWordEntries
    for (let i = 0; i < currentCategory.current; i++) {
      const key = Object.keys(wordJSON)[i];
      subWordEntries = subWordEntries.concat(Object.entries(wordJSON[key]));
    }
    // if all categories are finished, open access to all words
    if (currentCategory.current === Object.keys(wordJSON).length) {
      mainWordEntries = subWordEntries;
      return { mainWordEntries, subWordEntries };
    }

    const key = Object.keys(wordJSON)[currentCategory.current];
    mainWordEntries = Object.entries(wordJSON[key]);
    if (currentCategory.current === 0) {
      subWordEntries = Object.entries(wordJSON[key]);
    }

    return { mainWordEntries, subWordEntries };
  };

  const handleAmountChange = (item) => {
    setAmount(item);
    handleRandomWords(wordJSON);
  };

  // initialize randomWords for first-time render
  if (randomWords.length === 0) {
    handleRandomWords(wordJSON);
  }

  return {
    // functions
    handleKeyDown,
    handleAmountChange,
    reset,

    //game play logic
    currentCategoryIndex,
    setCurrentCategoryIndex,
    currentWordIndex,
    randomWords,
    answerMap,

    //word amount
    amounts,
    amount,
    setAmount,

    //display
    currentWordStatus: currentWordStatusRef.current,
    showModal,
    setShowModal,
    accWordLength,
    inputDisplay,

    //record
    record,
    isRunning,

    //Cangjie, keysRecord related
    keysRecord,
    keysRecordName,
  };
}

export default useCharacterHelper;
