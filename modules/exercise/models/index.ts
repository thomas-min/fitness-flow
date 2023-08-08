export type TBodyPart = 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'abs';

export interface IExercise {
  id: string;
  bodyPart: TBodyPart;
  name: string;
  unit: string;
  isDeleted: boolean;
}
