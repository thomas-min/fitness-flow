import { create } from 'zustand';
import { IProgram, IRoutine, IRoutineExercise } from '../models';
import { useMemo } from 'react';
import { useExercises } from '@/modules/exercise/hooks/useExerciseModelStore';

interface IRoutineStore {
  programs: Record<string, IProgram>;
  routines: Record<string, IRoutine>;
  routineExercises: Record<string, IRoutineExercise>;
  actions: {
    sync: () => void;
    addProgram: (program: IProgram) => void;
    removeProgram: (program: IProgram) => void;
    updateProgram: (program: IProgram) => void;
    addRoutine: (routine: IRoutine) => void;
    removeRoutine: (routine: IRoutine) => void;
    updateRoutine: (routine: IRoutine) => void;
  };
}

const useRoutineStore = create<IRoutineStore>((set) => ({
  programs: {},
  routines: {},
  routineExercises: {},
  actions: {
    sync: () => {
      // TODO: sync with sqlite
    },
    addProgram: (program) =>
      set((state) => ({ programs: { ...state.programs, [program.id]: program } })),
    removeProgram: (program) =>
      set((state) => {
        const { [program.id]: _, ...programs } = state.programs;
        return { programs };
      }),
    updateProgram: (program) =>
      set((state) => ({ programs: { ...state.programs, [program.id]: program } })),
    addRoutine: (routine) =>
      set((state) => ({ routines: { ...state.routines, [routine.id]: routine } })),
    removeRoutine: (routine) =>
      set((state) => {
        const { [routine.id]: _, ...routines } = state.routines;
        return { routines };
      }),
    updateRoutine: (routine) =>
      set((state) => ({ routines: { ...state.routines, [routine.id]: routine } })),
  },
}));

export const usePrograms = () => {
  const programs = useRoutineStore((state) => state.programs);
  const routines = useRoutineStore((state) => state.routines);
  const programsWithRoutines = useMemo(
    () =>
      Object.values(programs).map((program) => ({
        ...program,
        routines: Object.values(routines).filter((routine) => routine.programId === program.id),
      })),
    [programs, routines]
  );

  return programsWithRoutines;
};

export const useRoutines = () => {
  const routines = useRoutineStore((state) => state.routines);
  const routineExercises = useRoutineStore((state) => state.routineExercises);
  const exercises = useExercises();
  const routinesWithExercises = useMemo(() => {
    return Object.values(routines).map((routine) => ({
      ...routine,
      exercises: Object.values(routineExercises)
        .filter((routineExercise) => routineExercise.routineId === routine.id)
        .map((routineExercise) => exercises[routineExercise.exerciseId]),
    }));
  }, []);

  return routinesWithExercises;
};
