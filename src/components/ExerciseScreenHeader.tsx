import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export const ExerciseScreenHeader = function WorkoutScreenHeader() {
  const router = useRouter();

  return (
    <View className="relative flex-row items-center justify-center px-4 pt-2">
      <Text className="text-center text-xl font-bold">운동</Text>
      <Pressable
        onPress={() => router.push('/(stacks)/edit-exercise')}
        className="absolute right-4 rounded p-2 active:opacity-50">
        <Text className="text-gray-500">추가</Text>
      </Pressable>
    </View>
  );
};
