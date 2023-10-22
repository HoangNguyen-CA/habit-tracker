import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import useTheme from "@/hooks/useTheme";
import { Habit } from "@/shared/types/habit.interface";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme.context";

interface Props {
  habits: Habit[];
  selectedHabitId: string;
  setSelectedHabitId: (id: string) => void;
}

export default function Name(props: Props) {
  const styles = useTheme(stylesheet);
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: 10,
    },

    pickerContainer: {
      borderBottomWidth: 1,
      borderColor: theme.text[500],
      marginBottom: 10,
    },
    picker: {
      color: theme.text[500],
    },
  });
