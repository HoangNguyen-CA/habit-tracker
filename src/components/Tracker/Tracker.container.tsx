import useTheme from "@/hooks/useTheme";
import { StyleSheet, View } from "react-native";
import { Text } from "../UI";

interface Props {}

export default function Name(props: Props) {
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
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
