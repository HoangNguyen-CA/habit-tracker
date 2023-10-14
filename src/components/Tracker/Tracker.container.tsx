import useTheme from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";
import { Text } from "../UI";
import { FlatList } from "react-native-gesture-handler";
import useHabit from "@/hooks/useHabit";

interface Props {}

export default function Name(props: Props) {
  const { habits } = useHabit();
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      <Text>Habit Tracker</Text>
      <FlatList
        data={habits}
        renderItem={({ item }) => <Text>{item.description}</Text>}
      />
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.dark[500],
      flex: 1,
    },
  });
