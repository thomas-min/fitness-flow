import React, { forwardRef } from 'react';
import { View } from 'react-native';
import Calendar, { CalendarImperativeApi } from 'react-native-swipe-calendar';
import { CalendarDay } from '@/src/modules/workout/components/CalendarDay';
import { CalendarDayLabel } from '@/src/modules/workout/components/CalendarDayLabel';
import { CalendarHeader } from '@/src/modules/workout/components/CalendarHeader';
import {
  useCalendarActions,
  useCalendarCurrentDate,
  useCalendarSelectedDate,
} from '@/src/modules/workout/hooks/useCalendarStore';

export const WorkoutCalendar = forwardRef<CalendarImperativeApi, {}>(
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
