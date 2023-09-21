import { isSameMonth } from 'date-fns';
import React, { forwardRef } from 'react';
import { LayoutAnimation, View } from 'react-native';
import Calendar, { CalendarImperativeApi } from 'react-native-swipe-calendar';
import { useRecoilState } from 'recoil';

import { CalendarDayLabel } from './ui/CalendarDayLabel';
import { CalendarHeader } from './ui/CalendarHeader';
import { currentDateState, selectedDateState } from '../states/calendar';

import { CalendarDay } from '@/src/components/ui/CalendarDay';

export const WorkoutCalendar = forwardRef<CalendarImperativeApi, object>(
  function WorkoutCalendar(_, ref) {
    const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
    const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);

    const handleDateSelect = (date: Date, { isSelected }: { isSelected: boolean }) => {
      if (isSelected) {
        setSelectedDate(null);
      } else {
        setSelectedDate(date);
      }
    };

    const handlePageChange = (date: Date) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (isSameMonth(date, currentDate)) {
        setCurrentDate(date);
      } else {
        setCurrentDate(date);
        setSelectedDate(date);
      }
    };

    return (
      <View className="mx-2">
        <Calendar
          ref={ref}
          selectedDate={selectedDate}
          currentDate={currentDate}
          onDateSelect={handleDateSelect}
          onPageChange={handlePageChange}
          DayComponent={CalendarDay}
          DayLabelComponent={CalendarDayLabel}
          HeaderComponent={CalendarHeader}
        />
      </View>
    );
  }
);
