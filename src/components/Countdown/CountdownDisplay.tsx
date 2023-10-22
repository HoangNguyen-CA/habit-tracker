import { CountdownState } from "@/shared/types/countdownState.interface";
import { timeToTimeString, secondsToTime } from "@/shared/utils/time.util";
import { View, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { Text } from "@/components/UI";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";

interface Props {
  seconds: number;
  countdownState: CountdownState;
  maxTime: number;
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

  const fill = ((props.maxTime - props.seconds) * 100) / props.maxTime;
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        fill={fill}
        size={300}
        width={10}
        tintColor={theme.light[900]}
        backgroundColor={theme.light[200]}
      >
        {() => (
          <View>
            <Text style={styles.countdownText}>{displayString}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
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
