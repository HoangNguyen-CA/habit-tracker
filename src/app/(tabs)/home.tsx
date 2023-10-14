import { StyleSheet } from "react-native";

import Countdown from "@/components/Countdown/Countdown.container";
import { Time } from "@/shared/types/time.interface";
import { useState } from "react";
import { CountdownMode } from "@/shared/types/countdownMode.interface";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const styles = useTheme(stylesheet);

  /* below subject to change */
  const maxTimePomodoro = {
    hours: 0,
    minutes: 25,
    seconds: 0,
  };

  const maxTimeBreak = {
    hours: 0,
    minutes: 5,
    seconds: 0,
  };

  const nextStates = {
    [CountdownMode.pomodoro]: () => {
      setMode(CountdownMode.break);
      setMaxtime({ ...maxTimeBreak });
    },
    [CountdownMode.break]: () => {
      setMode(CountdownMode.pomodoro);
      setMaxtime({ ...maxTimePomodoro });
    },
  };

  /* above subject to change */

  const [maxTime, setMaxtime] = useState<Time>(maxTimePomodoro);
  const [mode, setMode] = useState<CountdownMode>(CountdownMode.pomodoro);

  const handleFinish = () => {
    nextStates[mode]();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Countdown maxTime={maxTime} onFinish={handleFinish} />
    </SafeAreaView>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
