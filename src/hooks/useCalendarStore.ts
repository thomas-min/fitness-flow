import { create } from 'zustand';

interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  markedDates: Date[];
  setCurrentDate: (newDate: Date) => void;
  setSelectedDate: (newDate: Date | null) => void;
  setMarkedDates: (newDates: Date[]) => void;
  isMarkedDate: (date: Date) => boolean;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  selectedDate: new Date(),
  markedDates: [new Date()], // TODO: remove default value
  setCurrentDate: (newDate: Date) => {
    set((state) => ({
      ...state,
      currentDate: newDate,
    }));
  },
  setSelectedDate: (newDate: Date | null) => {
    set((state) => ({
      ...state,
      selectedDate: newDate,
    }));
  },
  setMarkedDates: (newDates: Date[]) => {
    set((state) => ({
      ...state,
      markedDates: newDates,
    }));
  },
  isMarkedDate: (date: Date) => {
    return get().markedDates.some(
      (markedDate) => markedDate.toDateString() === date.toDateString()
    );
  },
}));
