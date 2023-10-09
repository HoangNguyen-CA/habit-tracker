import { CountdownState } from "@/shared/types/countdownState.interface";
import { Time } from "@/shared/types/time.interface";
import { timeToTimeString } from "@/shared/utils/time.util";
import { View, Text, StyleSheet } from "react-native";
interface Props {
  time: Time;
  countdownState: CountdownState;
}

export default function CountdownDisplay(props: Props) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownText: {
    fontSize: 75,
    fontWeight: "bold",
  },
});
