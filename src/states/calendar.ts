import { isSameDay } from 'date-fns';
import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

const calendarState = atom<{
  currentDate: Date;
  selectedDate: Date | null;
  markedDates: Date[];
}>({
  key: 'calendarState',
  default: {
    currentDate: new Date(),
    selectedDate: new Date(),
    markedDates: [new Date(), new Date(2023, 7, 1), new Date(2023, 7, 2)],
  },
});

export const currentDateState = selector({
  key: 'calendarCurrentDateState',
  get: ({ get }) => get(calendarState).currentDate,
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      set(calendarState, (state) => ({
        ...state,
        currentDate: new Date(),
      }));
    } else {
      set(calendarState, (state) => ({
        ...state,
        currentDate: newDate,
      }));
    }
  },
});

export const selectedDateState = selector({
  key: 'calendarSelectedDateState',
  get: ({ get }) => get(calendarState).selectedDate,
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      set(calendarState, (state) => ({
        ...state,
        selectedDate: new Date(),
      }));
    } else {
      set(calendarState, (state) => ({
        ...state,
        selectedDate: newDate,
      }));
    }
  },
});

export const markedDatesState = selector({
  key: 'calendarMarkedDatesState',
  get: ({ get }) => get(calendarState).markedDates,
  // TODO: add atom effect
});

export const isMarkedDateState = selectorFamily({
  key: 'calendarIsDateMarkedState',
  get:
    (date: Date) =>
    ({ get }) =>
      get(markedDatesState).some((markedDate) => isSameDay(markedDate, date)),
});
