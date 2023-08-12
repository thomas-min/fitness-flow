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

export interface IRoutineSet {
  id: number;
  routineId: number;
  exerciseId: number;
  setNumber: number;
  repCount: number;
  isDeleted?: boolean;
}

const routineSetColumnMapping: ColumnMapping<IRoutineSet> = {
  id: { type: columnTypes.INTEGER },
  routineId: { type: columnTypes.INTEGER },
  exerciseId: { type: columnTypes.INTEGER },
  setNumber: { type: columnTypes.INTEGER },
  repCount: { type: columnTypes.INTEGER },
  isDeleted: { type: columnTypes.BOOLEAN, default: () => false },
};

export const routineSetRepository = new Repository(
  'fitnessFlow',
  'routineSets',
  routineSetColumnMapping
);
