import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useExerciseViewActions } from '../hooks/useExerciseScreenStore';

export const ExerciseScreenHeader = function WorkoutScreenHeader() {
  const { toggleMode } = useExerciseViewActions();

  return (
    <View className="relative flex-row items-center justify-center px-4 pt-2">
      <Text className="text-center text-xl font-bold">운동</Text>
      <Pressable onPress={toggleMode} className="absolute right-4 rounded p-2 active:opacity-50">
        <Text className="text-gray-500">편집</Text>
      </Pressable>
    </View>
  );
};
