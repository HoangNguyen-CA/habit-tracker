import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Countdown from "@/components/Countdown/Countdown.container";
import { Time } from "@/shared/types/time.interface";
import { useState } from "react";
import { CountdownMode } from "@/shared/types/countdownMode.interface";

export default function Home() {
  /* subject to change */
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

  /* end of change */

  const [maxTime, setMaxtime] = useState<Time>(maxTimePomodoro);
  const [mode, setMode] = useState<CountdownMode>(CountdownMode.pomodoro);

  const handleFinish = () => {
    nextStates[mode]();
  };

  return (
    <View style={styles.container}>
      <Countdown maxTime={maxTime} onFinish={handleFinish} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
