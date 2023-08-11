import { IRoutine, IRoutineExercise } from '../models';

export const DEFAULT_ROUTINES: IRoutine[] = [
  {
    id: 1,
    name: '스트롱 리프트 A',
    position: 0,
  },
  {
    id: 2,
    name: '스트롱 리프트 B',
    position: 1,
  },
  {
    id: 3,
    name: '3분할 가슴',
    position: 2,
  },
  {
    id: 4,
    name: '3분할 등',
    position: 3,
  },
  {
    id: 5,
    name: '3분할 하체',
    position: 4,
  },
];

export const DEFAULT_ROUTINE_EXERCISES: IRoutineExercise[] = [
  {
    id: 1,
    routineId: 1,
    exerciseId: 2,
    position: 0,
  },
  {
    id: 2,
    routineId: 1,
    exerciseId: 1,
    position: 1,
  },
  {
    id: 3,
    routineId: 1,
    exerciseId: 5,
    position: 2,
  },
  {
    id: 4,
    routineId: 2,
    exerciseId: 2,
    position: 0,
  },
  {
    id: 5,
    routineId: 2,
    exerciseId: 4,
    position: 1,
  },
  {
    id: 6,
    routineId: 2,
    exerciseId: 3,
    position: 2,
  },
  {
    id: 7,
    routineId: 3,
    exerciseId: 1,
    position: 0,
  },
  {
    id: 8,
    routineId: 3,
    exerciseId: 4,
    position: 1,
  },
  {
    id: 9,
    routineId: 3,
    exerciseId: 10,
    position: 2,
  },
  {
    id: 10,
    routineId: 4,
    exerciseId: 5,
    position: 0,
  },
  {
    id: 11,
    routineId: 4,
    exerciseId: 6,
    position: 1,
  },
  {
    id: 12,
    routineId: 4,
    exerciseId: 9,
    position: 2,
  },
  {
    id: 13,
    routineId: 5,
    exerciseId: 2,
    position: 0,
  },
  {
    id: 14,
    routineId: 5,
    exerciseId: 3,
    position: 1,
  },
];
