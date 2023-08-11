import { ColumnMapping, Repository, columnTypes } from 'expo-sqlite-orm';

export interface IRoutine {
  id: number;
  name: string;
  position: number;
  isDeleted?: boolean;
}

const routineColumnMapping: ColumnMapping<IRoutine> = {
  id: { type: columnTypes.INTEGER },
  name: { type: columnTypes.TEXT },
  position: { type: columnTypes.INTEGER },
  isDeleted: { type: columnTypes.BOOLEAN, default: () => false },
};

export const routineRepository = new Repository('fitnessFlow', 'routines', routineColumnMapping);

export interface IRoutineExercise {
  id: number;
  routineId: number;
  exerciseId: number;
  position: number;
  isDeleted?: boolean;
}

const routineExerciseColumnMapping: ColumnMapping<IRoutineExercise> = {
  id: { type: columnTypes.INTEGER },
  routineId: { type: columnTypes.INTEGER },
  exerciseId: { type: columnTypes.INTEGER },
  position: { type: columnTypes.INTEGER },
  isDeleted: { type: columnTypes.BOOLEAN, default: () => false },
};

export const routineExerciseRepository = new Repository(
  'fitnessFlow',
  'routineExercises',
  routineExerciseColumnMapping
);
