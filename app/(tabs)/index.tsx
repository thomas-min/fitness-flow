import { Platform, UIManager } from 'react-native';
import { Divider } from '@/modules/common/components/Divider';
import { WorkoutCalendar } from '@/modules/workout/components/WorkoutCalendar';
import { WorkoutExerciseList } from '@/modules/workout/components/WorkoutExerciseList';
import { WorkoutScreenHeader } from '@/modules/workout/components/WorkoutScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

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
