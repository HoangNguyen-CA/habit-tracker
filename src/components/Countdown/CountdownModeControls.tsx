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
  const pomodoroActive = props.cdMode === CDMode.pomodoro;
  const breakActive = props.cdMode === CDMode.break;
  return (
    <View style={styles.modeContainer}>
      <Pressable
        style={[
          styles.modeTextContainer,
          pomodoroActive && styles.modeTextContainerActive,
        ]}
        onPress={() => props.switchMode(CDMode.pomodoro)}
      >
        <Text
          style={[styles.modeText, pomodoroActive && styles.modeTextActive]}
        >
          Pomodoro
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.modeTextContainer,
          breakActive && styles.modeTextContainerActive,
        ]}
        onPress={() => props.switchMode(CDMode.break)}
      >
        <Text style={[styles.modeText, breakActive && styles.modeTextActive]}>
          Break
        </Text>
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
      padding: 20,
      borderColor: theme.text[500],
    },
    modeTextContainerActive: {
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    modeText: {
      textAlign: "center",
    },
    modeTextActive: {},
  });
