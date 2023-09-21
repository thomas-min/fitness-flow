import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { IExercise } from '../db/exercise.model';

interface Props {
  exercise: IExercise;
}

export function ExerciseItem({ exercise }: Props) {
  const router = useRouter();

  return (
    <View className="flex-row items-center py-2">
      <Pressable
        className="flex-1 px-1 active:opacity-50"
        onPress={() =>
          router.push(`/edit-exercise?id=${exercise.id}&bodyPart=${exercise.bodyPart}`)
        }>
        <Text className="flex-1 text-base">{exercise.name}</Text>
      </Pressable>
    </View>
  );
}
