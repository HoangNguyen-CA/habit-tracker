import uuid from "react-native-uuid";
import { Habit } from "@/shared/types/habit.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import errorHandler from "@/shared/utils/errorHandler";

export const DEFAULT_HABIT: Habit = {
  id: "default",
  description: "Default Habit",
  dates: [],
};

export const createHabit = (description: string): Habit => {
  const id = uuid.v4().toString();
  return { id, description, dates: [] };
};

export const saveHabits = async (habits: Habit[]) => {
  console.log("saving: ", habits);
  try {
    await AsyncStorage.setItem("habits", JSON.stringify(habits));
  } catch (error) {
    errorHandler(error);
  }
};

// adds DEFAULT_HABIT IF EMPTY RESULT
export const getHabits = async (): Promise<Habit[] | undefined> => {
  try {
    const storedHabits = await AsyncStorage.getItem("habits");
    if (storedHabits === null) return [DEFAULT_HABIT];

    const habits = JSON.parse(storedHabits) as Habit[];
    if (habits.length === 0) {
      return [DEFAULT_HABIT];
    }
    console.log("getting: ", habits);
    return habits;
  } catch (error) {
    errorHandler(error);
  }
};
