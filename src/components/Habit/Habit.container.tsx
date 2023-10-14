import { useState } from "react";
import { Habit as HabitType } from "@/shared/types/habit.interface";
import { View, FlatList, StyleSheet } from "react-native";

import { TextInput } from "../UI/";
import HabitDisplay from "./HabitDisplay";
import * as HabitService from "@/services/Habit.service";
import useTheme from "@/hooks/useTheme";
import HabitOptionsModal from "./HabitOptionsModal";

export default function Habit() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [habitInput, setHabitInput] = useState("");
  const [selectedHabitOption, setSelectedHabitOption] =
    useState<HabitType | null>(null);

  const handleCreateHabit = () => {
    if (habitInput === "") return;

    const newHabit = {
      ...HabitService.createHabit(habitInput),
    };
    setHabits([...habits, newHabit]);
    setHabitInput("");
  };

  const handleShowOptions = (id: string) => {
    setSelectedHabitOption(habits.find((item) => item.id === id) || null);
  };

  const handleHideOptions = () => {
    setSelectedHabitOption(null);
  };

  const handleRenameHabit = (id: string, description: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id == id) {
          let renamedHabit = { ...habit, description };
          setSelectedHabitOption(renamedHabit);
          return renamedHabit;
        }
        return { ...habit };
      })
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
    setSelectedHabitOption(null);
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
          onSubmitEditing={handleCreateHabit}
        />
      </View>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <HabitDisplay
            onShowOptions={() => handleShowOptions(item.id)}
            habit={item}
          />
        )}
      ></FlatList>
      <HabitOptionsModal
        habit={selectedHabitOption}
        onDelete={handleDeleteHabit}
        onRename={handleRenameHabit}
        onHide={handleHideOptions}
      />
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
    scrollView: {
      height: 5,
    },
  });
