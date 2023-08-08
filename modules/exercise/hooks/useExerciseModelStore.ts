import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { IExercise, TBodyPart } from '../models';
import { persist } from 'zustand/middleware';
import { isEmpty, uniqueId } from 'lodash-es';
import { DEFAULT_EXERCISES } from '../configs';

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

const useExerciseStore = create<IExerciseModelStore>()(
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
      getStorage: () => AsyncStorage,
      partialize: (state) => ({ exercises: state.exercises }),
    }
  )
);

export const useExercises = () => useExerciseStore((state) => Object.values(state.exercises));
export const useExercise = (id: string) => useExerciseStore((state) => state.exercises[id]);
export const useExercisesByBodyPart = (bodyPart: TBodyPart) =>
  useExerciseStore((state) =>
    Object.values(state.exercises).filter((exercise) => exercise.bodyPart === bodyPart)
  );
export const useExerciseModelActions = () => useExerciseStore((state) => state.actions);
