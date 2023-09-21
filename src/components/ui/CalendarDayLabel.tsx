import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React from 'react';
import { Text, View } from 'react-native';
import { DayLabelComponentType } from 'react-native-swipe-calendar';

export const CalendarDayLabel: DayLabelComponentType = ({ date }) => {
  return (
    <View className="mx-2 h-8 w-8 items-center justify-center">
      <Text className="text-gray-500">{format(date, 'EE', { locale: ko })}</Text>
    </View>
  );
};
