export interface IProgram {
  id: string;
  name: string;
  isDeleted?: boolean;
}

export interface IRoutine {
  id: string;
  programId: string;
  name: string;
  isDeleted?: boolean;
}

export interface IRoutineExercise {
  id: string;
  routineId: string;
  exerciseId: string;
  isDeleted?: boolean;
}
