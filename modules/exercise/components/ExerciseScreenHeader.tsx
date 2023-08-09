import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useExerciseScreenMode, useExerciseViewActions } from '../hooks/useExerciseViewStore';

export const ExerciseScreenHeader = function WorkoutScreenHeader() {
  const mode = useExerciseScreenMode();
  const { toggleMode } = useExerciseViewActions();

  return (
    <View className="flex-row relative justify-center items-center px-4 pt-2">
      <Text className="text-xl text-center font-bold">운동</Text>
      <Pressable onPress={toggleMode} className="absolute right-4 active:opacity-70 p-2 rounded">
        <Text className="text-gray-500">편집</Text>
      </Pressable>
    </View>
  );
};
