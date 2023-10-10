import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { secondsToTime, timeToSeconds } from "@/shared/utils/time.util";

import { Time } from "@/shared/types/time.interface";
import { CountdownState } from "@/shared/types/countdownState.interface";
import useCountdown from "@/hooks/useCountdown";
import useTheme from "@/hooks/useTheme";

import CountdownDisplay from "./CountdownDisplay";
import CountdownControls from "./CountdownControls";

interface Props {
  maxTime: Time;
  onFinish: () => void;
}

export default function Countdown(props: Props) {
  const maxTimeInSeconds = timeToSeconds(props.maxTime);

  const { seconds, startTimer, stopTimer, resetTimer } = useCountdown(
    maxTimeInSeconds,
    props.onFinish
  );

  const [countdownState, setCountdownState] = useState(CountdownState.stopped);

  const time = secondsToTime(seconds);

  const styles = useTheme(stylesheet);

  const handleSkip = () => {
    resetTimer();
    props.onFinish();
    setCountdownState(CountdownState.stopped);
  };

  const handleStart = () => {
    startTimer();
    setCountdownState(CountdownState.counting);
  };

  const handlePause = () => {
    stopTimer();
    setCountdownState(CountdownState.paused);
  };

  const handleReset = () => {
    resetTimer();
    setCountdownState(CountdownState.stopped);
  };

  return (
    <View
      style={[
        styles.container,
        countdownState == CountdownState.counting
          ? styles["container-running"]
          : styles["container-stopped"],
      ]}
    >
      <View>
        <CountdownDisplay time={time} countdownState={countdownState} />
        <CountdownControls
          countdownState={countdownState}
          onStart={handleStart}
          onPause={handlePause}
          onSkip={handleSkip}
          onReset={handleReset}
        ></CountdownControls>
      </View>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    "container-running": {
      backgroundColor: theme.primary[500],
    },
    "container-stopped": {
      backgroundColor: theme.dark[500],
    },
  });
