import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";
import { View, Pressable } from "react-native";
import { Text } from "../UI";
import { CountdownMode as CDMode } from "@/shared/types/countdownMode.interface";

interface Props {
  cdMode: CDMode;
  switchMode: (mode: CDMode) => void;
}

export default function Name(props: Props) {
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.modeContainer}>
      <Pressable
        style={[
          styles.modeTextContainer,
          props.cdMode === CDMode.pomodoro && styles.modeTextContainerActive,
        ]}
        onPress={() => props.switchMode(CDMode.pomodoro)}
      >
        <Text style={styles.modeText}>Pomodoro</Text>
      </Pressable>
      <Pressable
        style={[
          styles.modeTextContainer,
          props.cdMode === CDMode.break && styles.modeTextContainerActive,
        ]}
        onPress={() => props.switchMode(CDMode.break)}
      >
        <Text style={styles.modeText}>Break</Text>
      </Pressable>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    modeContainer: {
      flexDirection: "row",
    },
    modeTextContainer: {
      flex: 1,
      borderWidth: 1,
      padding: 20,
      borderColor: theme.text[500],
    },
    modeTextContainerActive: {
      backgroundColor: theme.secondary[500],
      borderWidth: 0,
    },
    modeText: {
      textAlign: "center",
    },
  });
