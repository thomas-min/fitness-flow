import { ColumnMapping, Repository, columnTypes } from 'expo-sqlite-orm';

export type TBodyPart = 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'abs' | 'whole';

export interface IExercise {
  id: number;
  bodyPart: TBodyPart;
  name: string;
  unit: string;
  isDeleted?: boolean;
}

const columnMapping: ColumnMapping<IExercise> = {
  id: { type: columnTypes.TEXT },
  bodyPart: { type: columnTypes.TEXT },
  name: { type: columnTypes.TEXT },
  unit: { type: columnTypes.TEXT },
  isDeleted: { type: columnTypes.BOOLEAN, default: () => false },
};

export const exerciseRepository = new Repository('fitnessFlow', 'exercises', columnMapping);
