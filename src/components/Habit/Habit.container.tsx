import { useState } from "react";
import { Habits, Habit as HabitType } from "@/shared/types/habit.interface";
import { View, FlatList, StyleSheet } from "react-native";

import { TextInput, Button } from "../UI/";
import HabitDisplay from "./HabitDisplay";
import * as HabitService from "@/services/Habit.service";
import useTheme from "@/hooks/useTheme";

interface HabitOption extends HabitType {
  showOptions: boolean;
}

export default function Habit() {
  const [habits, setHabits] = useState<HabitOption[]>([]);
  const [habitInput, setHabitInput] = useState("");

  const handleCreateHabit = () => {
    if (habitInput === "") return;

    const newHabit = {
      showOptions: false,
      ...HabitService.createHabit(habitInput),
    };
    setHabits([...habits, newHabit]);
    setHabitInput("");
  };

  const handleShowOptions = (id: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id == id) return { ...habit, showOptions: true };
        return { ...habit, showOptions: false };
      })
    );
  };

  const handleHideOptions = () => {
    setHabits(
      habits.map((habit) => {
        return { ...habit, showOptions: false };
      })
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const styles = useTheme(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.createHabitContainer}>
        <TextInput
          style={styles.createHabitInput}
          value={habitInput}
          onChangeText={(val) => setHabitInput(val)}
          placeholder="Create Habit"
        />
        <Button
          containerStyle={styles.createHabitButton}
          onPress={handleCreateHabit}
        >
          +
        </Button>
      </View>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitDisplay
            optionsVisible={item.showOptions}
            onShowOptions={() => handleShowOptions(item.id)}
            onHideOptions={handleHideOptions}
            onDelete={() => handleDeleteHabit(item.id)}
            habit={item}
          />
        )}
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
    createHabitContainer: {
      flexDirection: "row",
    },
    createHabitInput: {
      flex: 1,
    },
    createHabitButton: {
      borderRadius: 0,
    },
    scrollView: {
      height: 5,
    },
  });
