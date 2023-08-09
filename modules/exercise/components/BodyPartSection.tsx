import { View, Text, Pressable } from 'react-native';
import { TBodyPart } from '../models';
import { BODY_PARTS_IN_KOREAN } from '../configs';
import { Divider } from '@/modules/common/components/Divider';
import { useExerciseModelActions, useExercisesByBodyPart } from '../hooks/useExerciseModelStore';
import { PlusIcon } from 'lucide-react-native';
import { useExerciseScreenMode } from '../hooks/useExerciseViewStore';
import { cn } from '@/modules/common/utils/cn';
import { useEffect } from 'react';
import { ExerciseItem } from './ExerciseItem';

interface Props {
  bodyPart: TBodyPart;
}

export function BodyPartSection({ bodyPart }: Props) {
  const exerciseScreenMode = useExerciseScreenMode();
  const exercises = useExercisesByBodyPart(bodyPart);

  const handleAddExercise = () => {};

  return (
    <View className="my-4">
      <View className="flex-row mb-1 justify-between items-center">
        <Text className="font-semibold ml-1 text-base">{BODY_PARTS_IN_KOREAN[bodyPart]}</Text>
        <Pressable
          disabled={exerciseScreenMode === 'view'}
          onPress={handleAddExercise}
          className={cn('active:bg-gray-100 p-2 rounded', {
            'opacity-0': exerciseScreenMode === 'view',
          })}>
          <PlusIcon className="text-gray-700" size={16}></PlusIcon>
        </Pressable>
      </View>
      <Divider />
      <View className="h-2"></View>
      {exercises.map((exercise) => (
        <ExerciseItem exercise={exercise} key={exercise.id} />
      ))}
    </View>
  );
}