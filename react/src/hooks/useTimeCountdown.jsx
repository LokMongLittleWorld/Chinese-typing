import { useEffect, useState } from "react";

export default function useTimeCountdown(_time) {
  const time = isNaN(_time) ? null : _time;
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTimeLeft(time);
    setIsTimeUp(false);
    setIsRunning(false);
  };

  //update timeLeft every second
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            setIsTimeUp(true);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return { timeLeft, start, pause, reset, isTimeUp };
}
