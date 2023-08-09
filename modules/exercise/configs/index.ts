import { IExercise, TBodyPart } from '../models';

export const BODY_PARTS: TBodyPart[] = [
  'chest',
  'back',
  'shoulders',
  'legs',
  'arms',
  'abs',
  'whole',
];

export const BODY_PARTS_IN_KOREAN: Record<TBodyPart, string> = {
  chest: '가슴',
  back: '등',
  shoulders: '어깨',
  legs: '다리',
  arms: '팔',
  abs: '복근',
  whole: '전신',
};

export const DEFAULT_EXERCISES: Record<string, IExercise> = {
  'bench-press': {
    id: 'bench-press',
    name: '벤치프레스',
    bodyPart: 'chest',
    unit: 'kg',
  },
  squat: {
    id: 'squat',
    name: '스쿼트',
    bodyPart: 'legs',
    unit: 'kg',
  },
  'dead-lift': {
    id: 'dead-lift',
    name: '데드리프트',
    bodyPart: 'legs',
    unit: 'kg',
  },
  'overhead-press': {
    id: 'overhead-press',
    name: '오버헤드프레스',
    bodyPart: 'shoulders',
    unit: 'kg',
  },
  'barbel-row': {
    id: 'barbel-row',
    name: '바벨로우',
    bodyPart: 'back',
    unit: 'kg',
  },
  'pull-up': {
    id: 'pull-up',
    name: '풀업',
    bodyPart: 'back',
    unit: 'kg',
  },
  'push-up': {
    id: 'push-up',
    name: '푸쉬업',
    bodyPart: 'chest',
    unit: 'kg',
  },
  'side-lateral-raise': {
    id: 'side-lateral-raise',
    name: '사이드레터럴레이즈',
    bodyPart: 'shoulders',
    unit: 'kg',
  },
  'barbel-curl': {
    id: 'exercise-9',
    name: '바벨컬',
    bodyPart: 'arms',
    unit: 'kg',
  },
  'skull-crusher': {
    id: 'exercise-10',
    name: '스컬크러셔',
    bodyPart: 'arms',
    unit: 'kg',
  },
  'ab-crunch': {
    id: 'exercise-11',
    name: '크런치',
    bodyPart: 'abs',
    unit: 'kg',
  },
  'leg-raise': {
    id: 'exercise-12',
    name: '레그레이즈',
    bodyPart: 'abs',
    unit: 'kg',
  },
  'clean-and-jerk': {
    id: 'clean-and-jerk',
    name: '클린앤저크',
    bodyPart: 'whole',
    unit: 'kg',
  },
  snatch: {
    id: 'snatch',
    name: '스내치',
    bodyPart: 'whole',
    unit: 'kg',
  },
};
