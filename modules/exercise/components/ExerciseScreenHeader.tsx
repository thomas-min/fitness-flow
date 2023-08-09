import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useExerciseViewActions } from '../hooks/useExerciseViewStore';

export const ExerciseScreenHeader = function WorkoutScreenHeader() {
  const { toggleMode } = useExerciseViewActions();

  return (
    <View className="flex-row relative justify-center items-center px-4 pt-2">
      <Text className="text-xl text-center font-bold">운동</Text>
      <Pressable onPress={toggleMode} className="absolute right-4 active:opacity-50 p-2 rounded">
        <Text className="text-gray-500">편집</Text>
      </Pressable>
    </View>
  );
};
