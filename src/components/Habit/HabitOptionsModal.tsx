import useTheme from "@/hooks/useTheme";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Habit } from "@/shared/types/habit.interface";
import { Modal, Text, Button, TextInput } from "../UI";

const DELETE_PROMPT = "Delete";

interface Props {
  habit: Habit | null;
  onDelete: (id: string) => void;
  onHide: () => void;
  onRename: (id: string, name: string) => void;
}

export default function HabitOptionsModal(props: Props) {
  const styles = useTheme(stylesheet);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");

  const handleEdit = () => {
    if (props.habit === null) return;
    props.onRename(props.habit.id, editValue);
    handleEditClose();
  };

  const handleDelete = () => {
    if (props.habit === null) return;
    if (deleteValue === DELETE_PROMPT) {
      props.onDelete(props.habit.id);
      handleDeleteClose();
    }
  };

  const handleEditClose = () => {
    setEditValue("");
    setEditOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteValue("");
    setDeleteOpen(false);
  };

  if (props.habit === null) return null;

  return (
    <Modal visible close={props.onHide} style={styles.modal}>
      <Text variant="dark" style={styles.optionsHeader}>
        Modifying '{props.habit.description}'
      </Text>

      <Button
        containerStyle={styles.optionButton}
        onPress={() => setEditOpen(true)}
      >
        Edit name
      </Button>
      <Button
        containerStyle={styles.optionButton}
        onPress={() => setDeleteOpen(true)}
      >
        Delete
      </Button>
      <Button containerStyle={styles.optionButton} onPress={props.onHide}>
        Cancel
      </Button>

      <Modal
        visible={editOpen}
        style={styles.smallModal}
        close={handleEditClose}
      >
        <Text style={styles.smallModalHeader}>Edit Habit Name</Text>
        <TextInput
          value={editValue}
          label="New Name"
          onChangeText={(val) => setEditValue(val)}
          onSubmitEditing={handleEdit}
        />
      </Modal>

      <Modal
        visible={deleteOpen}
        style={styles.smallModal}
        close={handleDeleteClose}
      >
        <Text style={styles.smallModalHeader}>
          This action is permanent, type "{DELETE_PROMPT}" to confirm
        </Text>
        <TextInput
          value={deleteValue}
          label={DELETE_PROMPT}
          onChangeText={(val) => setDeleteValue(val)}
          onSubmitEditing={handleDelete}
        />
      </Modal>
    </Modal>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    optionsHeader: {
      fontSize: 24,
    },

    modal: {
      alignItems: "center",
      justifyContent: "center",
      gap: 15,
      backgroundColor: theme.light[900],
    },

    optionButton: {
      width: 200,
    },

    smallModal: {
      width: "80%",
      height: "auto",
      maxHeight: "95%",
      backgroundColor: theme.secondary[500],
    },

    smallModalHeader: {
      fontSize: 20,
    },
  });
