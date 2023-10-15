import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { timeToSeconds } from '@/shared/utils/time.util';

import { CountdownState as CDState } from '@/shared/types/countdownState.interface';
import { CountdownMode as CDMode } from '@/shared/types/countdownMode.interface';

import useCountdown from '@/hooks/useCountdown';
import useTheme from '@/hooks/useTheme';
import useHabit from '@/hooks/useHabit';

import CountdownDisplay from './CountdownDisplay';
import CountdownControls from './CountdownControls';

const MAX_TIME_POMODORO = timeToSeconds({
  hours: 0,
  minutes: 0,
  seconds: 5,
});

const MAX_TIME_BREAK = timeToSeconds({
  hours: 0,
  minutes: 0,
  seconds: 20,
});

export default function Countdown() {
  const [mode, setMode] = useState<CDMode>(CDMode.pomodoro);
  const [countdownState, setCountdownState] = useState(CDState.stopped);
  const { habits } = useHabit();
  const [selectedHabitId, setSelectedHabitId] = useState<string>('');
  const { tryIncrementHabit } = useHabit();

  const handleSwitchMode = (mode: CDMode) => {
    setMode(mode);
    resetTimer();
    setCountdownState(CDState.stopped);
  };

  const handleStart = () => {
    startTimer();
    setCountdownState(CDState.counting);
  };

  const handlePause = () => {
    stopTimer();
    setCountdownState(CDState.paused);
  };

  const handleReset = () => {
    resetTimer();
    setCountdownState(CDState.stopped);
  };

  const handleFinish = () => {
    if (mode === CDMode.pomodoro) {
      tryIncrementHabit(selectedHabitId);
      handleSwitchMode(CDMode.break);
    } else if (mode === CDMode.break) {
      handleSwitchMode(CDMode.pomodoro);
    }
  };

  const { seconds, startTimer, stopTimer, resetTimer } = useCountdown(
    mode === CDMode.pomodoro ? MAX_TIME_POMODORO : MAX_TIME_BREAK,
    handleFinish
  );

  const styles = useTheme(stylesheet);

  return (
    <View
      style={[
        styles.container,
        countdownState == CDState.counting
          ? styles['container-running']
          : styles['container-stopped'],
      ]}
    >
      <View style={styles.innerContainer}>
        <CountdownDisplay seconds={seconds} countdownState={countdownState} />
        <CountdownControls
          countdownState={countdownState}
          cdMode={mode}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          habits={habits}
          selectedHabitId={selectedHabitId}
          setSelectedHabitId={setSelectedHabitId}
          switchMode={handleSwitchMode}
        ></CountdownControls>
      </View>
    </View>
  );
}

const stylesheet = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 15,
    },

    innerContainer: {
      width: '100%',
    },

    'container-running': {
      backgroundColor: theme.primary[500],
    },
    'container-stopped': {
      backgroundColor: theme.dark[500],
    },
  });
