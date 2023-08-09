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
  'exercise-1': {
    id: 'exercise-1',
    name: '벤치프레스',
    bodyPart: 'chest',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-2': {
    id: 'exercise-2',
    name: '스쿼트',
    bodyPart: 'legs',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-3': {
    id: 'exercise-3',
    name: '데드리프트',
    bodyPart: 'legs',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-4': {
    id: 'exercise-4',
    name: '오버헤드프레스',
    bodyPart: 'shoulders',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-5': {
    id: 'exercise-5',
    name: '바벨로우',
    bodyPart: 'back',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-6': {
    id: 'exercise-6',
    name: '풀업',
    bodyPart: 'back',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-7': {
    id: 'exercise-7',
    name: '푸쉬업',
    bodyPart: 'chest',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-8': {
    id: 'exercise-8',
    name: '사이드레터럴레이즈',
    bodyPart: 'shoulders',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-9': {
    id: 'exercise-9',
    name: '바벨컬',
    bodyPart: 'arms',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-10': {
    id: 'exercise-10',
    name: '스컬크러셔',
    bodyPart: 'arms',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-11': {
    id: 'exercise-11',
    name: '크런치',
    bodyPart: 'abs',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-12': {
    id: 'exercise-12',
    name: '레그레이즈',
    bodyPart: 'abs',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-13': {
    id: 'exercise-13',
    name: '클린앤저크',
    bodyPart: 'whole',
    unit: 'kg',
    isDeleted: false,
  },
  'exercise-14': {
    id: 'exercise-14',
    name: '스내치',
    bodyPart: 'whole',
    unit: 'kg',
    isDeleted: false,
  },
};
