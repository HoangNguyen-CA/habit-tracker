import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Habit as HabitType } from '@/shared/types/habit.interface';

import { TextInput, Text } from '../UI/';
import HabitDisplay from './HabitDisplay';
import useTheme from '@/hooks/useTheme';
import useHabit from '@/hooks/useHabit';

import HabitOptionsModal from './HabitOptionsModal';

export default function Habit() {
  const { habits, tryCreateHabit, tryDeleteHabit, tryRenameHabit } = useHabit();
  const [habitInput, setHabitInput] = useState('');
  const [selectedHabitOption, setSelectedHabitOption] =
    useState<HabitType | null>(null);

  const handleCreateHabit = async () => {
    if (habitInput === '') return;
    await tryCreateHabit(habitInput);
    setHabitInput('');
  };

  const handleShowOptions = (id: string) => {
    setSelectedHabitOption(habits.find((item) => item.id === id) || null);
  };

  const handleHideOptions = () => {
    setSelectedHabitOption(null);
  };

  const handleRenameHabit = async (id: string, description: string) => {
    const renamedHabit = await tryRenameHabit(id, description);
    setSelectedHabitOption(renamedHabit || null);
  };

  const handleDeleteHabit = async (id: string) => {
    await tryDeleteHabit(id);
    setSelectedHabitOption(null);
  };

  const styles = useTheme(stylesheet);

  return (
    <View style={styles.container}>
      <Text size='h1'>Manage Habits</Text>
      <View style={styles.createHabitContainer}>
        <TextInput
          style={styles.createHabitInput}
          value={habitInput}
          onChangeText={(val) => setHabitInput(val)}
          label='Add Habit'
          onSubmitEditing={handleCreateHabit}
        />
      </View>
      <FlatList
        data={habits}
        style={{ gap: 10 }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <HabitDisplay
            onShowOptions={() => handleShowOptions(item.id)}
            habit={item}
          />
        )}
      />
      <HabitOptionsModal
        habit={selectedHabitOption}
        onDelete={handleDeleteHabit}
        onRename={handleRenameHabit}
        onHide={handleHideOptions}
      />
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: theme.dark[500],
      padding: 15,
    },
    createHabitContainer: {
      marginBottom: 10,
    },
    createHabitInput: {},
    scrollView: {
      height: 5,
    },

    separator: {
      height: 10,
    },
  });
