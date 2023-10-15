import { Habit } from '@/shared/types/habit.interface';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../UI';
import useTheme from '@/hooks/useTheme';

interface Props {
  habit: Habit;
  onShowOptions: () => void;
}
export default function HabitDisplay(props: Props) {
  const styles = useTheme(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.habit.description}</Text>
      <Pressable style={styles.settings} onPress={props.onShowOptions}>
        <Ionicons name='settings-outline' size={26} color='white' />
      </Pressable>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondary[500],
      borderRadius: 4,
      flexDirection: 'row',
      padding: 20,
    },
    text: {
      fontSize: 20,
      flex: 1,
    },
    settings: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
