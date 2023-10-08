import { View, Text, StyleSheet } from "react-native";

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
