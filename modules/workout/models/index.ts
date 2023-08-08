export interface IWorkout {
  id: string;
  date: Date;
  isDeleted: boolean;
}

export interface IWorkoutSet {
  id: string;
  workoutId: string;
  exerciseId: string;
  setIndex: number;
  repetitionCount: number;
  isDeleted: boolean;
}
