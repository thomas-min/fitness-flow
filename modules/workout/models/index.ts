export interface IWorkout {
  id: string;
  date: Date;
  isDeleted?: boolean;
}

export interface IWorkoutSet {
  id: string;
  isCompleted: boolean;
  workoutId: string;
  exerciseId: string;
  setNumber: number;
  repCount: number;
  isDeleted?: boolean;
}
