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
  const [awaiting, setAwaiting] = useState(false);

  const handleKeyDown = (e) => {
    //   TODO: add hot key function
  };

  const handleChange = (e) => {
    e.preventDefault();
    const character = inputRef.current.value.at(-1);

    if (
      character !== text[currentWordIndex] &&
      !wrongWordIndex.includes(currentWordIndex)
    ) {
      setWrongWordIndex([...wrongWordIndex, currentWordIndex]);
    }

    if (character === text[currentWordIndex]) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };
  const inputRef = useRef(null);

  return {
    handleChange,
    handleKeyDown,
    currentWordIndex,
    inputRef,
    record,
    wrongWordIndex,
  };
}
export default useArticleHelper;
