import React, { forwardRef } from 'react';
import { View } from 'react-native';
import Calendar, { CalendarImperativeApi } from 'react-native-swipe-calendar';

import { CalendarDayLabel } from './ui/CalendarDayLabel';
import { CalendarHeader } from './ui/CalendarHeader';

import { CalendarDay } from '@/src/components/ui/CalendarDay';
import {
  useCalendarActions,
  useCalendarCurrentDate,
  useCalendarSelectedDate,
} from '@/src/hooks/useCalendarStore';

export const WorkoutCalendar = forwardRef<CalendarImperativeApi, object>(
  function WorkoutCalendar(_, ref) {
    const currentDate = useCalendarCurrentDate();
    const selectedDate = useCalendarSelectedDate();
    const { onDateSelect, onPageChange } = useCalendarActions();

    return (
      <View className="mx-2">
        <Calendar
          ref={ref}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onDateSelect={onDateSelect}
          onPageChange={onPageChange}
          DayComponent={CalendarDay}
          DayLabelComponent={CalendarDayLabel}
          HeaderComponent={CalendarHeader}
        />
      </View>
    );
  }
);
