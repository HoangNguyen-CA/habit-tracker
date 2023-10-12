import { View, StyleSheet } from "react-native";
import { Text } from "@/components/UI";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tracker() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tracker Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
