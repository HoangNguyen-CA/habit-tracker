import { Habit } from "@/shared/types/habit.interface";
import { View, StyleSheet, Modal } from "react-native";
import { Text, Button } from "../UI";
import useTheme from "@/hooks/useTheme";
interface Props {
  habit: Habit;
  optionsVisible: boolean;
  onShowOptions: () => void;
  onHideOptions: () => void;
  onDelete: () => void;
}
export default function HabitDisplay(props: Props) {
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.habit.description}</Text>
      <Button onPress={props.onShowOptions}>o</Button>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={props.optionsVisible}
        onRequestClose={() => {
          props.onHideOptions();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button onPress={props.onHideOptions}>Hide Model</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondary[500],
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
    },
    text: {
      padding: 20,
      fontSize: 20,
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
