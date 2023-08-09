import { IRoutine, IRoutineExercise } from '../models';

export const DEFAULT_ROUTINES: Record<string, IRoutine> = {
  'strong-lift-a': {
    id: 'strong-lift-a',
    name: '스트롱 리프트 A',
    order: 0,
  },
  'strong-lift-b': {
    id: 'strong-lift-b',
    name: '스트롱 리프트 B',
    order: 1,
  },
  'ppl-push': {
    id: 'ppl-push',
    name: '3분할 가슴',
    order: 2,
  },
  'ppl-pull': {
    id: 'ppl-pull',
    name: '3분할 등',
    order: 3,
  },
  'ppl-legs': {
    id: 'ppl-legs',
    name: '3분할 하체',
    order: 4,
  },
};

export const DEFAULT_ROUTINE_EXERCISES: Record<string, IRoutineExercise> = {
  'strong-lift-a-squat': {
    id: 'strong-lift-a-squat',
    routineId: 'strong-lift-a',
    exerciseId: 'squat',
    order: 0,
  },
  'strong-lift-a-bench-press': {
    id: 'strong-lift-a-bench-press',
    routineId: 'strong-lift-a',
    exerciseId: 'bench-press',
    order: 1,
  },
  'strong-lift-a-barbel-row': {
    id: 'strong-lift-a-barbel-row',
    routineId: 'strong-lift-a',
    exerciseId: 'barbel-row',
    order: 2,
  },
  'strong-lift-b-squat': {
    id: 'strong-lift-b-squat',
    routineId: 'strong-lift-b',
    exerciseId: 'squat',
    order: 0,
  },
  'strong-lift-b-overhead-press': {
    id: 'strong-lift-b-overhead-press',
    routineId: 'strong-lift-b',
    exerciseId: 'overhead-press',
    order: 1,
  },
  'strong-lift-b-dead-lift': {
    id: 'strong-lift-b-dead-lift',
    routineId: 'strong-lift-b',
    exerciseId: 'dead-lift',
    order: 2,
  },
  'ppl-push-bench-press': {
    id: 'ppl-push-bench-press',
    routineId: 'ppl-push',
    exerciseId: 'bench-press',
    order: 0,
  },
  'ppl-push-overhead-press': {
    id: 'ppl-push-overhead-press',
    routineId: 'ppl-push',
    exerciseId: 'overhead-press',
    order: 1,
  },
  'ppl-push-skull-crusher': {
    id: 'ppl-push-skull-crusher',
    routineId: 'ppl-push',
    exerciseId: 'skull-crusher',
    order: 2,
  },
  'ppl-pull-barbel-row': {
    id: 'ppl-pull-barbel-row',
    routineId: 'ppl-pull',
    exerciseId: 'barbel-row',
    order: 0,
  },
  'ppl-pull-pull-up': {
    id: 'ppl-pull-pull-up',
    routineId: 'ppl-pull',
    exerciseId: 'pull-up',
    order: 1,
  },
  'ppl-pull-barbel-curl': {
    id: 'ppl-pull-barbel-curl',
    routineId: 'ppl-pull',
    exerciseId: 'barbel-curl',
    order: 2,
  },
  'ppl-legs-squat': {
    id: 'ppl-legs-squat',
    routineId: 'ppl-legs',
    exerciseId: 'squat',
    order: 0,
  },
  'ppl-legs-dead-lift': {
    id: 'ppl-legs-dead-lift',
    routineId: 'ppl-legs',
    exerciseId: 'dead-lift',
    order: 1,
  },
};
