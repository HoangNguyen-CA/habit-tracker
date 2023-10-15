import { CountdownState } from "@/shared/types/countdownState.interface";
import { Button, Text } from "../UI";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useTheme from "@/hooks/useTheme";
import { Habit } from "@/shared/types/habit.interface";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";
import { CountdownMode } from "@/shared/types/countdownMode.interface";

interface Props {
  countdownState: CountdownState;
  countdownMode: CountdownMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  habits: Habit[];
  selectedHabitId: string;
  setSelectedHabitId: (id: string) => void;
}

export default function CountdownControls(props: Props) {
  const styles = useTheme(stylesheet);
  const theme = useContext(ThemeContext);
  const stoppedControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onStart}>
        Start
      </Button>
    </>
  );

  const countingControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onPause}>
        Pause
      </Button>
    </>
  );

  const pausedControls = (
    <>
      <Button containerStyle={styles.controlButton} onPress={props.onStart}>
        Resume
      </Button>
      <Button containerStyle={styles.controlButton} onPress={props.onReset}>
        Reset
      </Button>
    </>
  );

  let controls;
  switch (props.countdownState) {
    case CountdownState.stopped:
      controls = stoppedControls;
      break;
    case CountdownState.counting:
      controls = countingControls;
      break;
    case CountdownState.paused:
      controls = pausedControls;
      break;
  }

  return (
    <>
      <View style={styles.containerTop}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={props.selectedHabitId}
            onValueChange={(itemValue) => props.setSelectedHabitId(itemValue)}
            dropdownIconColor={theme.theme.text[500]}
            style={styles.picker}
          >
            {props.habits.map((habit) => (
              <Picker.Item
                key={habit.id}
                label={habit.description}
                value={habit.id}
              ></Picker.Item>
            ))}
          </Picker>
        </View>
        <View style={styles.modeContainer}>
          <Text style={styles.modeText}>Pomodoro</Text>
          <Text style={styles.modeText}>Break</Text>
        </View>
      </View>
      <View style={styles.containerBottom}>{controls}</View>
    </>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    containerTop: {
      flexDirection: "column",
      position: "absolute",
      bottom: "100%",
      left: 0,
      right: 0,
    },
    containerBottom: {
      flexDirection: "column",
      gap: 20,
      position: "absolute",
      top: "110%",
      left: 0,
      right: 0,
      alignItems: "center",
    },
    pickerContainer: {
      borderBottomWidth: 1,
      borderColor: theme.text[500],
      marginBottom: 10,
    },
    picker: {
      color: theme.text[500],
    },
    modeContainer: {
      flexDirection: "row",
      gap: 10,
    },
    modeText: {
      flex: 1,
      padding: 10,
      textAlign: "center",
      borderWidth: 1,
    },
    controlButton: {
      width: 220,
    },
  });
