import { useEffect, useState } from "react";

function useTimer() {
  // time is in 1/10 second
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 0.1);
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return { time, setTime, isRunning, setIsRunning };
}

function speedToWPM(speed) {
  return Math.floor(600 / speed);
}

export default useTimer;
