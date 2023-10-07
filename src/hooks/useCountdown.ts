import { useEffect, useState } from "react";

export default function useTimer(
  maxTimeInSeconds: number,
  onFinish: () => void
) {
  const [seconds, setSeconds] = useState<number>(maxTimeInSeconds);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const isRunning = timerId !== null;

  /* methods */

  const startTimer = () => {
    if (seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const resetTimer = () => {
    setSeconds(maxTimeInSeconds);
    stopTimer();
  };

  /* effects */

  useEffect(() => {
    if (seconds === 0) {
      onFinish();
      stopTimer();
    }
  }, [seconds]);

  useEffect(() => {
    resetTimer();
    return () => {
      stopTimer();
    };
  }, [maxTimeInSeconds]);

  return { seconds, isRunning, startTimer, stopTimer, resetTimer };
}
