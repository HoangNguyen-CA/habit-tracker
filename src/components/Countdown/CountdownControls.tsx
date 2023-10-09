import { CountdownState } from "@/shared/types/countdownState.interface";
import { Button } from "../UI";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";

interface Props {
  countdownState: CountdownState;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
  onReset: () => void;
}

export default function CountdownControls(props: Props) {
  const styles = useTheme(stylesheet);
  const stoppedControls = (
    <>
      <Button title="Start" onPress={props.onStart} />
    </>
  );

  const countingControls = (
    <>
      <Button title="Pause" onPress={props.onPause} />
    </>
  );

  const pausedControls = (
    <>
      <Button title="Resume" onPress={props.onStart} />
      <View style={styles.horizontalContainer}>
        <Button title="Reset" onPress={props.onReset} />
        <Button title="Skip" onPress={props.onSkip} />
      </View>
    </>
  );

  let controls;
  switch (props.countdownState) {
    case CountdownState.stopped:
      controls = stoppedControls;
      break;
    case CountdownState.counting:
      controls = countingControls;
      break;
    case CountdownState.paused:
      controls = pausedControls;
      break;
  }

  return <View style={styles.container}>{controls}</View>;
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 10,
    },
    horizontalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
  });
