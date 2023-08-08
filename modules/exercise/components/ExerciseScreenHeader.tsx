import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useExerciseScreenMode, useExerciseViewActions } from '../hooks/useExerciseViewStore';

export const ExerciseScreenHeader = function WorkoutScreenHeader() {
  const mode = useExerciseScreenMode();
  const { toggleMode } = useExerciseViewActions();

  return (
    <View className="flex-row justify-between items-center px-4 pt-2">
      <Text className="text-xl font-bold">운동</Text>
      <Pressable onPress={toggleMode} className="active:bg-gray-100 p-2 rounded">
        <Text className="text-gray-500">편집</Text>
      </Pressable>
    </View>
  );
};
