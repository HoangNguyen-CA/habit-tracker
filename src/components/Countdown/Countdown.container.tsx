import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { timeToSeconds } from "@/shared/utils/time.util";

import { CountdownState } from "@/shared/types/countdownState.interface";
import { CountdownMode } from "@/shared/types/countdownMode.interface";

import { Text } from "../UI";

import useCountdown from "@/hooks/useCountdown";
import useTheme from "@/hooks/useTheme";
import useHabit from "@/hooks/useHabit";

import CountdownDisplay from "./CountdownDisplay";
import CountdownControls from "./CountdownControls";

const MAX_TIME_POMODORO = timeToSeconds({
  hours: 0,
  minutes: 0,
  seconds: 5,
});

const MAX_TIME_BREAK = timeToSeconds({
  hours: 0,
  minutes: 0,
  seconds: 20,
});

interface Props {}

export default function Countdown(props: Props) {
  const [mode, setMode] = useState<CountdownMode>(CountdownMode.pomodoro);
  const [countdownState, setCountdownState] = useState(CountdownState.stopped);
  const { habits } = useHabit();
  const [selectedHabitId, setSelectedHabitId] = useState<string>("");
  const { tryIncrementHabit } = useHabit();

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

  const handleFinish = () => {
    if (mode === CountdownMode.pomodoro) {
      tryIncrementHabit(selectedHabitId);
      setMode(CountdownMode.break);
      resetTimer();
    } else if (mode === CountdownMode.break) {
      setMode(CountdownMode.pomodoro);
      resetTimer();
    }
    setCountdownState(CountdownState.stopped);
  };

  const { seconds, startTimer, stopTimer, resetTimer } = useCountdown(
    mode === CountdownMode.pomodoro ? MAX_TIME_POMODORO : MAX_TIME_BREAK,
    handleFinish
  );

  const styles = useTheme(stylesheet);

  return (
    <View
      style={[
        styles.container,
        countdownState == CountdownState.counting
          ? styles["container-running"]
          : styles["container-stopped"],
      ]}
    >
      <View style={styles.innerContainer}>
        <CountdownDisplay seconds={seconds} countdownState={countdownState} />
        <CountdownControls
          countdownState={countdownState}
          countdownMode={mode}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          habits={habits}
          selectedHabitId={selectedHabitId}
          setSelectedHabitId={setSelectedHabitId}
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
      width: "100%",
      padding: 15,
    },

    innerContainer: {
      width: "100%",
    },

    "container-running": {
      backgroundColor: theme.primary[500],
    },
    "container-stopped": {
      backgroundColor: theme.dark[500],
    },
  });
