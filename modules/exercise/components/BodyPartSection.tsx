import { useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction } from 'react';
import { View, Text, Pressable } from 'react-native';

import { ExerciseItem } from './ExerciseItem';
import { BODY_PARTS_IN_KOREAN } from '../configs';
import { useExerciseScreenMode } from '../hooks/useExerciseScreenStore';
import { IExercise, TBodyPart } from '../models';
import { deleteExercise } from '../utils';

import { Divider } from '@/modules/common/components/Divider';
import { cn } from '@/modules/common/utils/cn';

interface Props {
  bodyPart: TBodyPart;
  exercises: IExercise[];
  setExercises: Dispatch<SetStateAction<IExercise[]>>;
}

export function BodyPartSection({ bodyPart, exercises, setExercises }: Props) {
  const router = useRouter();

  const filteredExercises = exercises.filter((exercise) => exercise.bodyPart === bodyPart);
  const exerciseScreenMode = useExerciseScreenMode();
  const openEditScreen = () => {
    router.push(`/edit-exercise?bodyPart=${bodyPart}`);
  };

  const removeExercise = (exercise: IExercise) => {
    setExercises((prev) => prev.filter((prevExercise) => prevExercise.id !== exercise.id));
    deleteExercise(exercise);
  };

  if (filteredExercises.length === 0) {
    return null;
  }

  return (
    <View className="my-4">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="ml-1 text-base font-semibold">{BODY_PARTS_IN_KOREAN[bodyPart]}</Text>
        <Pressable
          disabled={exerciseScreenMode === 'view'}
          onPress={openEditScreen}
          className={cn('rounded p-2 active:opacity-50', {
            'opacity-0': exerciseScreenMode === 'view',
          })}>
          <PlusIcon className="text-gray-700" size={16} />
        </Pressable>
      </View>
      <Divider />
      <View className="h-2" />
      {filteredExercises.map((exercise) => (
        <ExerciseItem exercise={exercise} key={exercise.id} removeExercise={removeExercise} />
      ))}
    </View>
  );
}
