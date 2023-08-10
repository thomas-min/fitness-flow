import { useRouter } from 'expo-router';
import { CheckCircle2Icon, MinusCircle, PencilIcon } from 'lucide-react-native';
import { Text, Pressable } from 'react-native';
import { match } from 'ts-pattern';

import { useExerciseModelActions } from '../hooks/useExerciseModelStore';
import { useExerciseScreenMode } from '../hooks/useExerciseViewStore';
import { IExercise } from '../models';

import { cn } from '@/modules/common/utils/cn';

interface Props {
  exercise: IExercise;
}

export function ExerciseItem({ exercise }: Props) {
  const router = useRouter();

  const exerciseScreenMode = useExerciseScreenMode();
  const { removeExercise } = useExerciseModelActions();

  return (
    <Pressable className="flex-row items-center py-2">
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
    </Pressable>
  );
}
