import { create } from 'zustand';

type TMode = 'view' | 'edit';

interface IExerciseScreenStore {
  mode: TMode;
  actions: {
    toggleMode: () => void;
    setMode: (mode: TMode) => void;
  };
}

const useExerciseScreenStore = create<IExerciseScreenStore>((set) => ({
  mode: 'view',
  actions: {
    toggleMode: () => set((state) => ({ mode: state.mode === 'view' ? 'edit' : 'view' })),
    setMode: (mode) => set({ mode }),
  },
}));

export const useExerciseScreenMode = () => useExerciseScreenStore((state) => state.mode);
export const useExerciseViewActions = () => useExerciseScreenStore((state) => state.actions);
