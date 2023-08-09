import React from 'react';
import { View, Text, Pressable } from 'react-native';

export const RoutineScreenHeader = function WorkoutScreenHeader() {
  return (
    <View className="flex-row relative justify-center items-center px-4 pt-2">
      <Text className="text-xl text-center font-bold">루틴</Text>
      <Pressable className="absolute right-4 active:opacity-50 p-2 rounded">
        <Text className="text-gray-500">추가</Text>
      </Pressable>
    </View>
  );
};
