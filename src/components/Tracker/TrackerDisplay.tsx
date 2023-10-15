import useTheme from "@/hooks/useTheme";
import { Habit } from "@/shared/types/habit.interface";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "../UI";

interface Props {
  habit: Habit;
}

export default function TrackerDisplay(props: Props) {
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{props.habit.description}</Text>
      <Text>{props.habit.dates.length}</Text>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondary[500],
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      padding: 20,
    },
    description: {
      fontSize: 20,
      flex: 1,
    },
  });
