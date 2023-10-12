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
      <Button onPress={props.onStart}>Start</Button>
    </>
  );

  const countingControls = (
    <>
      <Button onPress={props.onPause}>Pause</Button>
    </>
  );

  const pausedControls = (
    <>
      <Button onPress={props.onStart}>Resume</Button>
      <Button onPress={props.onReset}>Reset</Button>
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
      gap: 20,
      position: "absolute",
      top: "110%",
      left: 0,
      right: 0,
    },
  });
