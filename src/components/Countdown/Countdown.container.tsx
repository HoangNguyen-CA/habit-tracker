import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { timeToSeconds } from "@/shared/utils/time.util";

import { CountdownState as CDState } from "@/shared/types/countdownState.interface";
import { CountdownMode as CDMode } from "@/shared/types/countdownMode.interface";

import useCountdown from "@/hooks/useCountdown";
import useTheme from "@/hooks/useTheme";
import useHabit from "@/hooks/useHabit";

import CountdownDisplay from "@/components/Countdown/CountdownDisplay";
import CountdownControls from "@/components/Countdown/CountdownControls";
import CountdownModeControls from "@/components/Countdown/CountdownModeControls";
import CountdownHabitPicker from "@/components/Countdown/CountdownHabitPicker";

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

export default function Countdown() {
  const [mode, setMode] = useState<CDMode>(CDMode.pomodoro);
  const [countdownState, setCountdownState] = useState(CDState.stopped);
  const { habits } = useHabit();
  const [selectedHabitId, setSelectedHabitId] = useState<string>("");
  const { tryIncrementHabit } = useHabit();

  const maxTime = mode === CDMode.pomodoro ? MAX_TIME_POMODORO : MAX_TIME_BREAK;

  const handleSwitchMode = (mode: CDMode) => {
    setMode(mode);
    resetTimer();
    setCountdownState(CDState.stopped);
  };

  const handleStart = () => {
    startTimer();
    setCountdownState(CDState.counting);
  };

  const handlePause = () => {
    stopTimer();
    setCountdownState(CDState.paused);
  };

  const handleReset = () => {
    resetTimer();
    setCountdownState(CDState.stopped);
  };

  const handleFinish = () => {
    if (mode === CDMode.pomodoro) {
      tryIncrementHabit(selectedHabitId);
      handleSwitchMode(CDMode.break);
    } else if (mode === CDMode.break) {
      handleSwitchMode(CDMode.pomodoro);
    }
  };

  const { seconds, startTimer, stopTimer, resetTimer } = useCountdown(
    maxTime,
    handleFinish
  );

  const styles = useTheme(stylesheet);

  return (
    <View
      style={[
        styles.container,
        countdownState == CDState.counting
          ? styles["container-running"]
          : styles["container-stopped"],
      ]}
    >
      <View style={styles.innerContainer}>
        <CountdownModeControls cdMode={mode} switchMode={handleSwitchMode} />
        <CountdownDisplay
          maxTime={maxTime}
          seconds={seconds}
          countdownState={countdownState}
        />
        <CountdownControls
          countdownState={countdownState}
          onStart={handleStart}
          onPause={handlePause}
        ></CountdownControls>

        <CountdownHabitPicker
          habits={habits}
          selectedHabitId={selectedHabitId}
          setSelectedHabitId={setSelectedHabitId}
        ></CountdownHabitPicker>
      </View>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
