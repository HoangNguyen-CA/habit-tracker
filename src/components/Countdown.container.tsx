import { Button, StyleSheet, Text, View } from "react-native";
import {
  secondsToTime,
  timeToTimeString,
  timeToSeconds,
} from "@/shared/utils/time.util";

import { Time } from "@/shared/types/time.interface";
import useCountdown from "@/hooks/useCountdown";

interface Props {
  maxTime: Time;
  onFinish: () => void;
}

export default function Countdown(props: Props) {
  const maxTimeInSeconds = timeToSeconds(props.maxTime);

  const { seconds, isRunning, startTimer, stopTimer, resetTimer } =
    useCountdown(maxTimeInSeconds, props.onFinish);

  const time = secondsToTime(seconds);
  const timeString = timeToTimeString(time);

  const handleSkip = () => {
    resetTimer();
    props.onFinish();
  };

  return (
    <View>
      <Text>
        {time.hours > 0 && `{${timeString.hours}:`}
        {timeString.minutes}:{timeString.seconds}
      </Text>
      <Button title="start" onPress={startTimer} />
      <Button title="stop" onPress={stopTimer} />
      {isRunning && <Button title="reset" onPress={resetTimer} />}
      {isRunning && <Button title="skip" onPress={handleSkip} />}
    </View>
  );
}
