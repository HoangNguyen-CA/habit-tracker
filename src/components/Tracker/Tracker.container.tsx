import useTheme from '@/hooks/useTheme';
import { StyleSheet, View } from 'react-native';
import { Text } from '../UI';
import { FlatList } from 'react-native-gesture-handler';
import useHabit from '@/hooks/useHabit';
import TrackerDisplay from './TrackerDisplay';

interface Props {}

export default function Name(props: Props) {
  const { habits } = useHabit();
  const styles = useTheme(stylesheet);
  return (
    <View style={styles.container}>
      <Text size='h1'>Track Habits</Text>
      <FlatList
        data={habits}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <TrackerDisplay habit={item} />}
      />
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.dark[500],
      flex: 1,
      padding: 15,
    },
    separator: {
      height: 10,
    },
  });
