import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { DayComponentType, useCalendarContext } from 'react-native-swipe-calendar';
import { useIsCalendarDateMarked } from '../hooks/useCalendarStore';
import clsx from 'clsx';

export const CalendarDay: DayComponentType = ({
  date,
  isSelected,
  isInDisplayedMonth,
  isToday,
}) => {
  const { onDateSelect } = useCalendarContext();
  const marked = useIsCalendarDateMarked(date);
  const onDayPress = () => onDateSelect?.(date, { isSelected });

  return (
    <Pressable
      onPress={onDayPress}
      className={clsx('m-2 h-8 w-8 items-center justify-center rounded-full active:opacity-50', {
        'bg-blue-500': isSelected,
      })}>
      <View className={clsx('h-1 w-1')} />
      <Text
        className={clsx({
          'text-gray-300': !isInDisplayedMonth,
          'text-blue-500': isToday,
          'text-white': isSelected,
        })}>
        {date.getDate()}
      </Text>
      <View
        className={clsx('h-1 w-1 rounded-full', {
          'bg-blue-300': marked,
          'bg-blue-500': isSelected,
        })}
      />
    </Pressable>
  );
};
