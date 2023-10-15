import { CountdownState } from "@/shared/types/countdownState.interface";
import { Time } from "@/shared/types/time.interface";
import { timeToTimeString, secondsToTime } from "@/shared/utils/time.util";
import { View, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { Text } from "@/components/UI";

interface Props {
  seconds: number;
  countdownState: CountdownState;
}

export default function CountdownDisplay(props: Props) {
  const styles = useTheme(stylesheet);
  const time = secondsToTime(props.seconds);
  const timeString = timeToTimeString(time);

  let displayString = `${timeString.minutes}:${timeString.seconds}`;
  if (time.hours > 0) {
    displayString = `${timeString.hours}:${displayString}`;
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.countdownText}>{displayString}</Text>
      </View>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    countdownText: {
      fontFamily: "RobotoMono_400Regular",
      fontSize: 85,
    },
  });
