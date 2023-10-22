import { CountdownState } from "@/shared/types/countdownState.interface";
import { Button } from "../UI";
import { StyleSheet, View } from "react-native";
import useTheme from "@/hooks/useTheme";

interface Props {
  countdownState: CountdownState;
  onStart: () => void;
  onPause: () => void;
}

export default function CountdownControls(props: Props) {
  const styles = useTheme(stylesheet);
  const stoppedControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onStart}>
        Start
      </Button>
    </>
  );

  const countingControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onPause}>
        Pause
      </Button>
    </>
  );

  const pausedControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onStart}>
        Resume
      </Button>
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
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
    },

    controlButton: {
      width: 220,
    },
  });
