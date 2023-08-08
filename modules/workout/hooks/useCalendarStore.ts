import { LayoutAnimation } from 'react-native';
import { create } from 'zustand';
import { isSameDay, isSameMonth } from 'date-fns';
import { useMemo } from 'react';
import { TODAY } from '../../common/configs/dateTime';

interface ICalendarStore {
  currentDate: Date;
  selectedDate: Date | null;
  markedDates: Date[];
  onDateSelect: (date: Date, { isSelected }: { isSelected: boolean }) => void;
  onPageChange: (date: Date) => void;
}

const useCalendarStore = create<ICalendarStore>((set) => ({
  currentDate: TODAY,
  selectedDate: TODAY,
  markedDates: [TODAY, new Date(2023, 7, 1), new Date(2023, 7, 2)],
  onDateSelect: (date, { isSelected }) => {
    set((state) => {
      if (isSelected) {
        return {
          ...state,
          selectedDate: null,
        };
      }

      return {
        ...state,
        selectedDate: date,
      };
    });
  },
  onPageChange: (date) => {
    set((state) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (isSameMonth(state.currentDate, date)) {
        return {
          ...state,
          currentDate: date,
        };
      } else {
        return {
          ...state,
          currentDate: date,
          selectedDate: date,
        };
      }
    });
  },
}));

export const useCalendarCurrentDate = () => useCalendarStore((state) => state.currentDate);
export const useCalendarSelectedDate = () => useCalendarStore((state) => state.selectedDate);
export const useCalendarMarkedDates = () => useCalendarStore((state) => state.markedDates);
export const useIsCalendarDateMarked = (date: Date) => {
  const markedDates = useCalendarMarkedDates();
  const isSelected = useMemo(
    () => markedDates.some((markedDate) => isSameDay(markedDate, date)),
    [markedDates, date]
  );
  return isSelected;
};
export const useCalendarActions = () => ({
  onDateSelect: useCalendarStore((state) => state.onDateSelect),
  onPageChange: useCalendarStore((state) => state.onPageChange),
});
