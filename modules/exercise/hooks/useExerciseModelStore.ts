import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash-es';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { DEFAULT_EXERCISES } from '../configs';
import { IExercise, TBodyPart } from '../models';

interface IExerciseModelStore {
  exercises: Record<string, IExercise>;
  actions: {
    seed: () => void;
    clear: () => void;
    addExercise: (exercise: IExercise) => void;
    removeExercise: (exercise: IExercise) => void;
    updateExercise: (exercise: IExercise) => void;
  };
}

const useExerciseModelStore = create<IExerciseModelStore>()(
  persist(
    (set, get) => ({
      exercises: {},
      actions: {
        seed: () => {
          if (isEmpty(get().exercises)) {
            set((state) => ({ ...state, exercises: DEFAULT_EXERCISES }));
          }
        },
        clear: () => set((state) => ({ ...state, exercises: {} })),
        addExercise: (exercise) =>
          set((state) => ({ exercises: { ...state.exercises, [exercise.id]: exercise } })),
        removeExercise: (exercise) =>
          set((state) => {
            const { [exercise.id]: _, ...exercises } = state.exercises;
            return { exercises };
          }),
        updateExercise: (exercise) =>
          set((state) => ({ exercises: { ...state.exercises, [exercise.id]: exercise } })),
      },
    }),
    {
      name: 'exercise-model-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ exercises: state.exercises }),
    }
  )
);

export const useExerciseList = () =>
  useExerciseModelStore((state) => Object.values(state.exercises));
export const useExerciseObject = () => useExerciseModelStore((state) => state.exercises);

export const useExerciseById: (id: string) => IExercise | undefined = (id: string) =>
  useExerciseModelStore((state) => state.exercises[id]);
export const useExercisesByIds = (ids: string[]) =>
  useExerciseModelStore((state) => ids.map((id) => state.exercises[id]));
export const useExercisesByBodyPart = (bodyPart: TBodyPart) =>
  useExerciseModelStore((state) =>
    Object.values(state.exercises).filter((exercise) => exercise.bodyPart === bodyPart)
  );

export const useExerciseModelActions = () => useExerciseModelStore((state) => state.actions);
