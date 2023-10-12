import { useState } from "react";
import { Habits } from "@/shared/types/habit.interface";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "../UI/";
import HabitDisplay from "./HabitDisplay";
import * as HabitService from "@/services/Habit.service";
import useTheme from "@/hooks/useTheme";

export default function Habit() {
  const [habits, setHabits] = useState<Habits>([]);
  const [habitInput, setHabitInput] = useState("");

  const handleCreateHabit = () => {
    const newHabit = HabitService.createHabit(habitInput);
    setHabits([...habits, newHabit]);
  };

  const styles = useTheme(stylesheet);

  return (
    <View style={styles.container}>
      <TextInput
        value={habitInput}
        onChangeText={(val) => setHabitInput(val)}
      />
      <Button title="Create Habit" onPress={handleCreateHabit} />
      <FlatList
        data={habits}
        renderItem={({ item }) => <HabitDisplay habit={item} />}
      ></FlatList>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.dark[500],
    },
    scrollView: {
      height: 5,
    },
  });
