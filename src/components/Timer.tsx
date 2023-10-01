import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { secondsToTime, timeToTimeString } from "@/shared/utils/time.util";

interface Props {
  seconds: number;
  onFinish: () => void;
}

export default function Timer(props: Props) {
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

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
    stopTimer();
    setSeconds(props.seconds);
  };

  useEffect(() => {
    setSeconds(props.seconds);
    return () => {
      stopTimer();
    };
  }, [props.seconds]);

  useEffect(() => {
    if (seconds === 0) {
      stopTimer();
      props.onFinish();
    }
  }, [seconds]);

  const time = secondsToTime(seconds);
  const timeString = timeToTimeString(time);
  return (
    <View>
      <Text>
        {timeString.hours}:{timeString.minutes}:{timeString.seconds}
      </Text>
      <Button title="start" onPress={startTimer} />
      <Button title="stop" onPress={stopTimer} />
      {seconds !== props.seconds && (
        <Button title="reset" onPress={resetTimer} />
      )}
    </View>
  );
}
