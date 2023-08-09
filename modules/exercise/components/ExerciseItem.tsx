import { Text, Pressable } from 'react-native';
import { IExercise } from '../models';
import { CheckCircle2Icon, MinusCircle, PencilIcon } from 'lucide-react-native';
import { useExerciseScreenMode } from '../hooks/useExerciseViewStore';
import { cn } from '@/modules/common/utils/cn';
import { match } from 'ts-pattern';
import { useExerciseModelActions } from '../hooks/useExerciseModelStore';
import { useRouter } from 'expo-router';

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
        className={cn('active:opacity-70 p-2 rounded')}>
        {match(exerciseScreenMode)
          .with('view', () => <CheckCircle2Icon className="text-gray-900" size={16} />)
          .with('edit', () => <MinusCircle className="text-red-500" size={16} />)
          .exhaustive()}
      </Pressable>
      <Text className="flex-1 text-md">{exercise.name}</Text>
      <Pressable
        onPress={() =>
          router.push(
            `/edit-exercise?id=${exercise.id}&bodyPart=${exercise.bodyPart}&name=${exercise.name}`
          )
        }
        className={cn('mr-1 active:opacity-70', {
          'opacity-0': exerciseScreenMode === 'view',
        })}
        disabled={exerciseScreenMode === 'view'}>
        <PencilIcon className="text-gray-900" size={16} />
      </Pressable>
    </Pressable>
  );
}
