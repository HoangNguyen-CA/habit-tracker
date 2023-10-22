import { CountdownState } from "@/shared/types/countdownState.interface";
import { Text } from "../UI";
import { StyleSheet, View } from "react-native";
import useTheme from "@/hooks/useTheme";

interface Props {
  countdownState: CountdownState;
}

export default function CountdownControls(props: Props) {
  const styles = useTheme(stylesheet);
  const stoppedControls = (
    <>
      <Text style={styles.control}>Start</Text>
    </>
  );

  const countingControls = (
    <>
      <Text style={styles.control}>Pause</Text>
    </>
  );

  const pausedControls = (
    <>
      <Text style={styles.control}>Resume</Text>
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

  return (
    <>
      <View style={styles.container}>{controls}</View>
    </>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      flexDirection: "column",
      alignItems: "center",
    },

    control: {},
  });
