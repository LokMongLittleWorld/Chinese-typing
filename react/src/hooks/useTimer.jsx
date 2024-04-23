import { useEffect, useRef, useState } from "react";

function useTimer() {
  // time is in 1/10 second
  const timeRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [prevTime, setPrevTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        timeRef.current += 0.1;
      }, 100);
    } else {
      timeRef.current = 0;
      setPrevTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const getTimeInterval = () => {
    const timeInterval = timeRef.current - prevTime;
    setPrevTime(timeRef.current);
    return timeInterval;
  };

  return { time: timeRef.current, isRunning, setIsRunning, getTimeInterval };
}

export default useTimer;
