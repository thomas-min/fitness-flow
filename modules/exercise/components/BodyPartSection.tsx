import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { View, Text, Pressable } from 'react-native';

import { ExerciseItem } from './ExerciseItem';
import { BODY_PARTS_IN_KOREAN } from '../configs';
import { useExercisesByBodyPart } from '../hooks/useExerciseModelStore';
import { useExerciseScreenMode } from '../hooks/useExerciseViewStore';
import { TBodyPart } from '../models';

import { Divider } from '@/modules/common/components/Divider';
import { cn } from '@/modules/common/utils/cn';

interface Props {
  bodyPart: TBodyPart;
}

export function BodyPartSection({ bodyPart }: Props) {
  const router = useRouter();

  const exerciseScreenMode = useExerciseScreenMode();
  const exercises = useExercisesByBodyPart(bodyPart);

  const handleAddExercise = () => {
    router.push(`/edit-exercise?bodyPart=${bodyPart}`);
  };

  return (
    <View className="my-4">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="ml-1 text-base font-semibold">{BODY_PARTS_IN_KOREAN[bodyPart]}</Text>
        <Pressable
          disabled={exerciseScreenMode === 'view'}
          onPress={handleAddExercise}
          className={cn('rounded p-2 active:opacity-50', {
            'opacity-0': exerciseScreenMode === 'view',
          })}>
          <PlusIcon className="text-gray-700" size={16} />
        </Pressable>
      </View>
      <Divider />
      <View className="h-2" />
      {exercises.map((exercise) => (
        <ExerciseItem exercise={exercise} key={exercise.id} />
      ))}
    </View>
  );
}
