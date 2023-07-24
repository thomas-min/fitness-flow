import { Platform, UIManager } from 'react-native';
import { Divider } from '@/src/modules/common/components/Divider';
import { WorkoutCalendar } from '@/src/modules/workout/components/WorkoutCalendar';
import { WorkoutExerciseList } from '@/src/modules/workout/components/WorkoutExerciseList';
import { WorkoutScreenContainer } from '@/src/modules/workout/components/WorkoutScreenContainer';
import { WorkoutScreenHeader } from '@/src/modules/workout/components/WorkoutScreenHeader';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function WorkoutScreen() {
  return (
    <WorkoutScreenContainer>
      <WorkoutScreenHeader />
      <WorkoutCalendar />
      <Divider />
      <WorkoutExerciseList />
    </WorkoutScreenContainer>
  );
}
