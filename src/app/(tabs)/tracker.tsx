import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrackerContainer from "@/components/Tracker/Tracker.container";

export default function Tracker() {
  return (
    <SafeAreaView style={styles.container}>
      <TrackerContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
