import { ColumnMapping, Repository, columnTypes } from 'expo-sqlite-orm';

import { IExercise } from '@/modules/exercise/models';

export interface IRoutine {
  id: number;
  name: string;
  position: number;
  isDeleted?: boolean;
}

export interface IRoutineWithExercises extends IRoutine {
  exercises: IExercise[];
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

export interface IRoutineExerciseSet {
  id: number;
  routineExerciseId: number;
  exerciseUnitValue?: string;
  setNumber: number;
  repCount?: number;
  isDeleted?: boolean;
}

const routineExerciseSetColumnMapping: ColumnMapping<IRoutineExerciseSet> = {
  id: { type: columnTypes.INTEGER },
  routineExerciseId: { type: columnTypes.INTEGER },
  exerciseUnitValue: { type: columnTypes.INTEGER, default: () => null },
  setNumber: { type: columnTypes.INTEGER },
  repCount: { type: columnTypes.INTEGER, default: () => null },
  isDeleted: { type: columnTypes.BOOLEAN, default: () => false },
};

export const routineExerciseSetRepository = new Repository(
  'fitnessFlow',
  'routineExerciseSets',
  routineExerciseSetColumnMapping
);
