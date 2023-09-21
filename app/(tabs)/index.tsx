import { Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WorkoutCalendar } from '@/src/components/WorkoutCalendar';
import { WorkoutExerciseList } from '@/src/components/WorkoutExerciseList';
import { WorkoutScreenHeader } from '@/src/components/WorkoutScreenHeader';
import { Divider } from '@/src/components/ui/Divider';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function WorkoutScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <WorkoutScreenHeader />
      <WorkoutCalendar />
      <Divider />
      <WorkoutExerciseList />
    </SafeAreaView>
  );
}
