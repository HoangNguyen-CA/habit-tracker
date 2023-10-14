import uuid from "react-native-uuid";
import { Habit } from "@/shared/types/habit.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import errorHandler from "@/shared/utils/errorHandler";

export const createHabit = (description: string): Habit => {
  const id = uuid.v4().toString();
  return { id, description, dates: [] };
};

export const saveHabits = async (habits: Habit[]) => {
  try {
    await AsyncStorage.setItem("habits", JSON.stringify(habits));
  } catch (error) {
    errorHandler(error);
  }
};

export const getHabits = async (): Promise<Habit[] | undefined> => {
  try {
    const storedHabits = await AsyncStorage.getItem("habits");
    if (storedHabits === null) return [];
    const habits = JSON.parse(storedHabits) as Habit[];
    return habits;
  } catch (error) {
    errorHandler(error);
  }
};
