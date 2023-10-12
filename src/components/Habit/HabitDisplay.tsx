import { Habit } from "@/shared/types/habit.interface";
import { Text } from "../UI";
interface Props {
  habit: Habit;
}
export default function HabitDisplay(props: Props) {
  return <Text>{props.habit.description}</Text>;
}
