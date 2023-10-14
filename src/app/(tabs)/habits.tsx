import { StyleSheet } from "react-native";
import HabitContainer from "@/components/Habit/Habit.container";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Habit() {
  return (
    <SafeAreaView style={styles.container}>
      <HabitContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
