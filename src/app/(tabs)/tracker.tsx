import { View, StyleSheet } from "react-native";
import { Text } from "@/components/UI";

export default function Tracker() {
  return (
    <View style={styles.container}>
      <Text>Tracker Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
});
