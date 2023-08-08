import { View, Text, Pressable } from 'react-native';
import { IExercise } from '../models';
import { CheckCircle2Icon, MinusCircle } from 'lucide-react-native';
import { useExerciseScreenMode } from '../hooks/useExerciseViewStore';
import { cn } from '@/modules/common/utils/cn';
import { match } from 'ts-pattern';
import { useExerciseModelActions } from '../hooks/useExerciseModelStore';

interface Props {
  exercise: IExercise;
}

export function ExerciseItem({ exercise }: Props) {
  const exerciseScreenMode = useExerciseScreenMode();
  const { removeExercise } = useExerciseModelActions();

  return (
    <Pressable className="flex-row items-center py-2">
      <Pressable
        onPress={() => removeExercise(exercise)}
        disabled={exerciseScreenMode === 'view'}
        className={cn('active:bg-gray-100 p-2 rounded')}>
        {match(exerciseScreenMode)
          .with('view', () => <CheckCircle2Icon className="text-gray-900" size={16} />)
          .with('edit', () => <MinusCircle className="text-red-500" size={16} />)
          .exhaustive()}
      </Pressable>
      <Text className="text-md">{exercise.name}</Text>
    </Pressable>
  );
}
