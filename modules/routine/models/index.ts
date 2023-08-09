export interface IRoutine {
  id: string;
  name: string;
  order: number;
  isDeleted?: boolean;
}

export interface IRoutineExercise {
  id: string;
  routineId: string;
  exerciseId: string;
  order: number;
  isDeleted?: boolean;
}
