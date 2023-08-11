import { useRouter } from 'expo-router';
import { CheckCircle2Icon, MinusCircle, PencilIcon } from 'lucide-react-native';
import { Text, Pressable, View } from 'react-native';
import { match } from 'ts-pattern';

import { useExerciseScreenMode } from '../hooks/useExerciseScreenStore';
import { IExercise } from '../models';

import { cn } from '@/modules/common/utils/cn';

interface Props {
  exercise: IExercise;
  removeExercise: (exercise: IExercise) => void;
}

export function ExerciseItem({ exercise, removeExercise }: Props) {
  const router = useRouter();

  const exerciseScreenMode = useExerciseScreenMode();

  return (
    <View className="flex-row items-center py-2">
      <Pressable
        onPress={() => removeExercise(exercise)}
        disabled={exerciseScreenMode === 'view'}
        className={cn('rounded p-2 active:opacity-50')}>
        {match(exerciseScreenMode)
          .with('view', () => <CheckCircle2Icon className="text-gray-900" size={16} />)
          .with('edit', () => <MinusCircle className="text-red-500" size={16} />)
          .exhaustive()}
      </Pressable>
      <Text className="text-md flex-1">{exercise.name}</Text>
      <Pressable
        onPress={() =>
          router.push(`/edit-exercise?id=${exercise.id}&bodyPart=${exercise.bodyPart}`)
        }
        className={cn('mr-2 active:opacity-50', {
          'opacity-0': exerciseScreenMode === 'view',
        })}
        disabled={exerciseScreenMode === 'view'}>
        <PencilIcon className="text-gray-900" size={16} />
      </Pressable>
    </View>
  );
}
