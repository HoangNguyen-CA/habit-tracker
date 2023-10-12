import { StyleSheet } from "react-native";
import Habit from "@/components/Habit/Habit.container";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Tasks() {
  return (
    <SafeAreaView style={styles.container}>
      <Habit />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
