import { CountdownState } from "@/shared/types/countdownState.interface";
import { Time } from "@/shared/types/time.interface";
import { timeToTimeString } from "@/shared/utils/time.util";
import { View, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { Text } from "@/components/UI";

interface Props {
  time: Time;
  countdownState: CountdownState;
}

export default function CountdownDisplay(props: Props) {
  const styles = useTheme(stylesheet);
  const timeString = timeToTimeString(props.time);

  let displayString = `${timeString.minutes}:${timeString.seconds}`;
  if (props.time.hours > 0) {
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
      color: theme.text[500],
      fontFamily: "RobotoMono_400Regular",
      fontSize: 85,
    },
  });
