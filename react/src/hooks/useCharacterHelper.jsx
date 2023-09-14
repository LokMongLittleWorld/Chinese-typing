import { useEffect, useState } from "react";
import useTimer from "./useTimer.jsx";
import useRecorder from "./useRecorder.jsx";

function useCharacterHelper(Radicals) {
  const [record, setRecord] = useState({ speed: null, accuracy: null });
  const [currentRadicalIndex, setCurrentRadicalIndex] = useState(0);
  const [currentRadicalStatus, setCurrentRadicalStatus] = useState("default");
  const [shouldTransition, setShouldTransition] = useState(false);
  const [amounts, setAmounts] = useState([25, 50, 100]);
  const [amount, setAmount] = useState(amounts[0]);
  const [randomRadicals, setRandomRadicals] = useState([]);
  const [wrongRaidcals, setWrongRadicals] = useState(new Map());
  const { time, setTime, setIsRunning } = useTimer();
  const { speed, accuracy } = useRecorder();
  const handleKeyDown = async (e) => {
    if (currentRadicalIndex === 0) {
      setIsRunning(true);
    }
    if (currentRadicalIndex === amount - 1) {
      setIsRunning(false);
      setRecord({
        speed: speed(amount, time),
        accuracy: accuracy(amount, wrongRaidcals.size),
      });
      setCurrentRadicalIndex(0);
      setTime(0);
      setWrongRadicals(new Map());
      setRandomRadicals(getRandomRadicals(Radicals));
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      if (
        Radicals[randomRadicals[currentRadicalIndex]] === e.key.toLowerCase()
      ) {
        setCurrentRadicalStatus(() => "correct");
        // Wait 60ms
        // await new Promise((resolve) => setTimeout(resolve, 60));
        setCurrentRadicalIndex((prev) => prev + 1);
        setCurrentRadicalStatus(() => "default");
        setShouldTransition(true); // Set to true to enable transition
      } else {
        // TODO: turn wrongAmount to array, store wrong radicals
        setWrongRadicals((prev) => prev.set(currentRadicalIndex, e.key));
        setCurrentRadicalStatus(() => "wrong");
      }
    }
  };
  const getRandomRadicals = (radicals) => {
    const radicalKeys = Object.keys(radicals);
    const shuffledRadicals = radicalKeys.sort(() => 0.5 - Math.random());
    const selectedRadicals = shuffledRadicals.slice(0, amount);
    return selectedRadicals;
  };

  useEffect(() => {
    const initialRandomRadicals = getRandomRadicals(Radicals);
    setRandomRadicals(initialRandomRadicals);
  }, [amount]);

  useEffect(() => {
    setShouldTransition(false);
  }, [currentRadicalIndex]);
  return {
    handleKeyDown,
    record,
    currentRadicalIndex,
    currentRadicalStatus,
    shouldTransition,
    amounts,
    amount,
    randomRadicals,
    wrongRaidcals,
    time,
    setTime,
    setIsRunning,
  };
}
export default useCharacterHelper;
