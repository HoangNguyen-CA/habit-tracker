import { Habit } from "@/shared/types/habit.interface";
import { View, StyleSheet } from "react-native";
import { Text, Button, Modal, TextInput } from "../UI";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
interface Props {
  habit: Habit;
  onShowOptions: () => void;
}
export default function HabitDisplay(props: Props) {
  const styles = useTheme(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.habit.description}</Text>
      <Button onPress={props.onShowOptions}>o</Button>
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
      borderWidth: 1,
    },
    text: {
      padding: 20,
      fontSize: 20,
      flex: 1,
    },
  });
