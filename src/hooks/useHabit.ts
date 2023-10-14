import { HabitContext } from "@/context/habit.context";
import { useContext } from "react";

export default function useHabit() {
  const { habits, createHabit, deleteHabit, renameHabit } =
    useContext(HabitContext);

  const tryCreateHabit = async (description: string) => {
    if (createHabit !== undefined) createHabit(description);
  };

  const tryRenameHabit = async (id: string, description: string) => {
    if (renameHabit !== undefined) {
      return await renameHabit(id, description);
    }
  };

  const tryDeleteHabit = async (id: string) => {
    if (deleteHabit !== undefined) deleteHabit(id);
  };

  return { habits, tryCreateHabit, tryRenameHabit, tryDeleteHabit };
}
