import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { Habit } from "@/shared/types/habit.interface";
import {
  getHabits,
  saveHabits,
  createHabit as createHabitService,
} from "@/services/Habit.service";
import errorHandler from "@/shared/utils/errorHandler";

interface ContextValue {
  habits: Habit[];
  createHabit?: (description: string) => Promise<void>;
  renameHabit?: (id: string, description: string) => Promise<Habit | undefined>;
  deleteHabit?: (id: string) => Promise<void>;
}

export const HabitContext = createContext<ContextValue>({
  habits: [],
});

export const HabitContextProvider = (props: { children?: React.ReactNode }) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const action = async () => {
      const res = await getHabits();
      if (res !== undefined) {
        setHabits(res);
      }
    };

    action();
  }, []);

  // actions

  const saveHabitsToStorage = async (updatedHabits: Habit[]) => {
    try {
      await saveHabits(updatedHabits);
      setHabits(updatedHabits);
    } catch (e) {
      errorHandler(e);
    }
  };

  const createHabit = async (description: string) => {
    const createdHabit = createHabitService(description);
    const updatedHabits = [...habits, createdHabit];
    await saveHabitsToStorage(updatedHabits);
  };

  const renameHabit = async (id: string, description: string) => {
    let updatedHabit: Habit | undefined;
    const updatedHabits = habits.map((habit) => {
      if (habit.id == id) {
        updatedHabit = { ...habit, description };
        return updatedHabit;
      }
      return { ...habit };
    });

    await saveHabitsToStorage(updatedHabits);
    return updatedHabit;
  };

  const deleteHabit = async (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    await saveHabitsToStorage(updatedHabits);
  };

  return (
    <HabitContext.Provider
      value={{ habits, createHabit, renameHabit, deleteHabit }}
    >
      {props.children}
    </HabitContext.Provider>
  );
};
