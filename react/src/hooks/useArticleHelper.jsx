import { useRef, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useArticleHelper(text) {
  // game play logic
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // record
  const [record, setRecord] = useState({ speed: 0, accuracy: 0 });
  const { time, isRunning, setIsRunning, getTimeInterval } = useTimer();
  const { speed, accuracy } = useRecorder();
  const [wrongWordIndex, setWrongWordIndex] = useState([]);

  //display
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const handleKeyDown = (e) => {
    //   TODO: add hot key function
  };

  const handleChange = (e) => {
    e.preventDefault();
    const character = inputRef.current.value.at(-1);

    if (currentWordIndex === 0) {
      setIsRunning(true);
    }

    // incorrect input
    //prettier-ignore
    if (character !== text[currentWordIndex] && !wrongWordIndex.includes(currentWordIndex)) {
      setWrongWordIndex([...wrongWordIndex, currentWordIndex]);
    }

    // correct input
    if (character === text[currentWordIndex]) {
      // endGame
      if (currentWordIndex === text.length - 1) {
        setIsRunning(false);
        setCurrentWordIndex(0);
        setWrongWordIndex([]);
        inputRef.current.value = "";
        setRecord({
          speed: speed(text.length, time),
          accuracy: accuracy(text.length, wrongWordIndex.length),
        });
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
    handleChange,
    handleKeyDown,
    currentWordIndex,
    currentLineIndex,
    inputRef,
    record,
    wrongWordIndex,
  };
}
export default useArticleHelper;
