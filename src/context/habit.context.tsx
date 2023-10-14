import React, { createContext } from "react";
import { useState } from "react";
import { Habit } from "@/shared/types/habit.interface";

interface ContextValue {
  habits: Habit[];
}

export const HabitContext = createContext<ContextValue>({
  habits: [],
});

export const ThemeContextProvider = (props: { children?: React.ReactNode }) => {
  const [habits, setHabits] = useState([]);

  return (
    <HabitContext.Provider value={{ habits }}>
      {props.children}
    </HabitContext.Provider>
  );
};
