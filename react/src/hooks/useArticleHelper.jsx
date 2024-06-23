import { useRef, useState } from "react";
import useTimer from "./useTimer.jsx";

function useArticleHelper(text) {
  // game play logic
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // record
  const [record, setRecord] = useState({ speed: 0, accuracy: 0 });
  const { time, isRunning, setIsRunning, getTimeInterval } = useTimer();
  const [wrongWordIndex, setWrongWordIndex] = useState([]);
  const [isEndGame, setIsEndGame] = useState(false);

  //display
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleKeyDown = (e) => {
    //   TODO: add hot key function
    // if (!isRunning && e.key === "Enter") {
    //   setIsRunning(true);
    // }
  };

  const endGame = () => {
    setIsRunning(false);
    setIsEndGame(true);
  };

  const resetGame = () => {
    setIsRunning(false);
    setCurrentWordIndex(0);
    setWrongWordIndex([]);
    inputRef.current = "";
    setIsEndGame(false);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    // if (!isRunning) return;

    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    const character = inputRef.current.value;

    // incorrect input
    //prettier-ignore
    if (character !== text[currentWordIndex] && !wrongWordIndex.includes(currentWordIndex)) {
      setWrongWordIndex([...wrongWordIndex, currentWordIndex]);
    }

    // correct input
    if (character === text[currentWordIndex]) {
      // endGame
      if (currentWordIndex === text.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        endGame();
        return;
      }
      // next word
      const nextCharacter = text[currentWordIndex + 1];
      if (nextCharacter === "\n") {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentWordIndex(currentWordIndex + 2);
        return;
      }
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };
  const inputRef = useRef(null);

  return {
    time,
    handleOnChange,
    handleKeyDown,
    currentWordIndex,
    currentLineIndex,
    inputRef,
    record,
    wrongWordIndex,
    isRunning,
    endGame,
    isEndGame,
    resetGame,
  };
}
export default useArticleHelper;
