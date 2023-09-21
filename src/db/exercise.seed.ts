import { IExercise, TBodyPart } from './exercise.model';

export const BODY_PARTS: TBodyPart[] = [
  'chest',
  'back',
  'shoulders',
  'legs',
  'arms',
  'abs',
  'whole',
  'etc',
];

export const BODY_PARTS_IN_KOREAN: Record<TBodyPart, string> = {
  chest: '가슴',
  back: '등',
  shoulders: '어깨',
  legs: '하체',
  arms: '팔',
  abs: '복근',
  whole: '전신',
  etc: '기타',
};

export const DEFAULT_EXERCISES: IExercise[] = [
  {
    id: 1,
    name: '벤치프레스',
    bodyPart: 'chest',
    unit: 'kg',
  },
  {
    id: 2,
    name: '스쿼트',
    bodyPart: 'legs',
    unit: 'kg',
  },
  {
    id: 3,
    name: '데드리프트',
    bodyPart: 'legs',
    unit: 'kg',
  },
  {
    id: 4,
    name: '오버헤드프레스',
    bodyPart: 'shoulders',
    unit: 'kg',
  },
  {
    id: 5,
    name: '바벨로우',
    bodyPart: 'back',
    unit: 'kg',
  },
  {
    id: 6,
    name: '풀업',
    bodyPart: 'back',
    unit: 'kg',
  },
  {
    id: 7,
    name: '푸쉬업',
    bodyPart: 'chest',
    unit: 'kg',
  },
  {
    id: 8,
    name: '사이드레터럴레이즈',
    bodyPart: 'shoulders',
    unit: 'kg',
  },
  {
    id: 9,
    name: '바벨컬',
    bodyPart: 'arms',
    unit: 'kg',
  },
  {
    id: 10,
    name: '스컬크러셔',
    bodyPart: 'arms',
    unit: 'kg',
  },
  {
    id: 11,
    name: '크런치',
    bodyPart: 'abs',
    unit: 'kg',
  },
  {
    id: 12,
    name: '레그레이즈',
    bodyPart: 'abs',
    unit: 'kg',
  },
  {
    id: 13,
    name: '클린앤저크',
    bodyPart: 'whole',
    unit: 'kg',
  },
  {
    id: 14,
    name: '스내치',
    bodyPart: 'whole',
    unit: 'kg',
  },
];
