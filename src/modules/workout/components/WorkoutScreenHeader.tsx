import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useCalendarCurrentDate } from '@/src/modules/workout/hooks/useCalendarStore';
import { PlusIcon } from 'lucide-react-native';

export const WorkoutScreenHeader = function WorkoutScreenHeader() {
  const currentDate = useCalendarCurrentDate();

  return (
    <View className="flex-row justify-between items-center px-4 pt-2">
      <Text className="text-xl font-bold">
        {format(currentDate, 'yyyy년 MM월', { locale: ko })}
      </Text>
      <Pressable className="active:bg-gray-100 p-1 rounded">
        <PlusIcon className="text-gray-900" />
      </Pressable>
    </View>
  );
};
