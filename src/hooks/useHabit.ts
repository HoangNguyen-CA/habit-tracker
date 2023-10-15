import { HabitContext } from "@/context/habit.context";
import { useContext, useCallback } from "react";

export default function useHabit() {
  const { habits, createHabit, deleteHabit, renameHabit, incrementHabit } =
    useContext(HabitContext);

  const tryCreateHabit = useCallback(
    async (description: string) => {
      if (createHabit !== undefined) createHabit(description);
    },
    [createHabit]
  );

  const tryRenameHabit = useCallback(
    async (id: string, description: string) => {
      if (renameHabit !== undefined) {
        return await renameHabit(id, description);
      }
    },
    [renameHabit]
  );

  const tryDeleteHabit = useCallback(
    async (id: string) => {
      if (deleteHabit !== undefined) deleteHabit(id);
    },
    [deleteHabit]
  );

  const tryIncrementHabit = useCallback(
    async (id: string) => {
      if (incrementHabit !== undefined) incrementHabit(id);
    },
    [incrementHabit]
  );

  return {
    habits,
    tryCreateHabit,
    tryRenameHabit,
    tryDeleteHabit,
    tryIncrementHabit,
  };
}
