import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PlusIcon } from 'lucide-react-native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

import { currentDateState } from '../states/calendar';

export const WorkoutScreenHeader = function WorkoutScreenHeader() {
  const currentDate = useRecoilValue(currentDateState);

  return (
    <View className="flex-row items-center justify-between px-4 pt-2">
      <Text className="text-xl font-bold">
        {format(currentDate, 'yyyy년 MM월', { locale: ko })}
      </Text>
      <Pressable className="rounded p-1 active:opacity-50">
        <PlusIcon className="text-gray-900" />
      </Pressable>
    </View>
  );
};
