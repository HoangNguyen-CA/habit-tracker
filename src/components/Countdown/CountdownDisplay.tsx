import { CountdownState } from "@/shared/types/countdownState.interface";
import { timeToTimeString, secondsToTime } from "@/shared/utils/time.util";
import { Pressable, StyleSheet, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { Text } from "@/components/UI";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";
import CountdownControls from "@/components/Countdown/CountdownControls";

interface Props {
  seconds: number;
  countdownState: CountdownState;
  maxTime: number;
  onStart: () => void;
  onPause: () => void;
}

export default function CountdownDisplay(props: Props) {
  const styles = useTheme(stylesheet);
  const { theme } = useContext(ThemeContext);
  const time = secondsToTime(props.seconds);
  const timeString = timeToTimeString(time);

  let displayString = `${timeString.minutes}:${timeString.seconds}`;
  if (time.hours > 0) {
    displayString = `${timeString.hours}:${displayString}`;
  }

  const action =
    props.countdownState === CountdownState.paused ||
    props.countdownState === CountdownState.stopped
      ? props.onStart
      : props.onPause;

  const fill = ((props.maxTime - props.seconds) * 100) / props.maxTime;
  return (
    <Pressable style={styles.container} onPress={action}>
      <AnimatedCircularProgress
        fill={fill}
        size={300}
        width={10}
        tintColor={theme.light[900]}
      >
        {() => (
          <View>
            <Text style={styles.countdownText}>{displayString}</Text>
            <CountdownControls countdownState={props.countdownState} />
          </View>
        )}
      </AnimatedCircularProgress>
    </Pressable>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: 10,
    },
    countdownText: {
      fontFamily: "RobotoMono_400Regular",
      fontSize: 75,
    },
  });
