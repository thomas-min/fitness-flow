import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { IRoutine, IRoutineExercise } from '../models';
import { persist } from 'zustand/middleware';
import { useMemo } from 'react';
import { useExerciseObject } from '@/modules/exercise/hooks/useExerciseModelStore';
import { isEmpty } from 'lodash-es';
import { DEFAULT_ROUTINES, DEFAULT_ROUTINE_EXERCISES } from '../configs';

interface IRoutineModelStore {
  routines: Record<string, IRoutine>;
  routineExercises: Record<string, IRoutineExercise>;
  actions: {
    seed: () => void;
    addRoutine: (routine: IRoutine) => void;
    removeRoutine: (routine: IRoutine) => void;
    updateRoutine: (routine: IRoutine) => void;
  };
}

const useRoutineModelStore = create<IRoutineModelStore>()(
  persist(
    (set, get) => ({
      programs: {},
      routines: {},
      routineExercises: {},
      actions: {
        seed: () => {
          if (isEmpty(get().routines) && isEmpty(get().routineExercises)) {
            set(() => ({
              routines: DEFAULT_ROUTINES,
              routineExercises: DEFAULT_ROUTINE_EXERCISES,
            }));
          }
        },
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
    }),
    {
      name: 'routine-model-store',
      getStorage: () => AsyncStorage,
      partialize: (state) => ({
        routines: state.routines,
        routineExercises: state.routineExercises,
      }),
    }
  )
);

export const useRoutines = () => {
  const routines = useRoutineModelStore((state) => state.routines);
  const routineExercises = useRoutineModelStore((state) => state.routineExercises);
  const exercises = useExerciseObject();
  const routinesWithExercises = useMemo(() => {
    return Object.values(routines)
      .map((routine) => ({
        ...routine,
        exercises: Object.values(routineExercises)
          .filter((routineExercise) => routineExercise.routineId === routine.id)
          .map((routineExercise) => exercises[routineExercise.exerciseId])
          .slice(),
      }))
      .slice()
      .sort((a, b) => a.order - b.order);
  }, []);

  return routinesWithExercises;
};

export const useRoutineModelActions = () => useRoutineModelStore((state) => state.actions);
