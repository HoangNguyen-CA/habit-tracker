import uuid from "react-native-uuid";
import { Habit } from "@/shared/types/habit.interface";

export const createHabit = (description: string): Habit => {
  const id = uuid.v4().toString();
  return { id, description };
};
