import { IQueryOptions } from 'expo-sqlite-orm';

import { IExercise, exerciseRepository } from '@/src/db/exercise.model';

export async function getExercise(id: number) {
  const exercise = await exerciseRepository.find(id);

  if (exercise?.isDeleted) {
    return null;
  }
  return exercise;
}

export async function getExercises(query?: IQueryOptions<IExercise>) {
  return exerciseRepository.query({
    ...query,
    where: { ...query?.where, isDeleted: { equals: false } },
  });
}

export function createExercise(exercise: IExercise) {
  return exerciseRepository.insert(exercise);
}

export function updateExercise(exercise: IExercise) {
  return exerciseRepository.update(exercise);
}

export function deleteExercise(exercise: IExercise) {
  return exerciseRepository.update({ ...exercise, isDeleted: true });
}
