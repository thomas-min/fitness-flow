import { IQueryOptions } from 'expo-sqlite-orm';

import {
  IRoutine,
  IRoutineExercise,
  IRoutineWithExercises,
  routineExerciseRepository,
  routineExerciseSetRepository,
  routineRepository,
} from '../models';

import { exerciseRepository } from '@/modules/exercise/models';

export type TRoutine = NonNullable<Awaited<ReturnType<typeof getRoutine>>>;

export async function createRoutine(routine: IRoutineWithExercises) {
  const _routine = await routineRepository.insert(routine);
  const _routineExercises: Omit<IRoutineExercise, 'id'>[] = routine.exercises.map(
    (exercise, position) => ({
      routineId: _routine.id,
      exerciseId: exercise.id,
      position,
      isDeleted: false,
    })
  );

  await routineExerciseRepository.databaseLayer.bulkInsertOrReplace(_routineExercises);

  return {
    ..._routine,
    exercises: routine.exercises,
  };
}

export async function getRoutines(query?: IQueryOptions<IRoutine>) {
  const routines = await routineRepository.query({
    ...query,
    where: { ...query?.where, isDeleted: { equals: false } },
  });
  const routineIds = routines.map((routine) => routine.id);
  const routineExercises = await routineExerciseRepository.query({
    where: { routineId: { in: routineIds }, isDeleted: { equals: false } },
  });
  const exercises = await exerciseRepository.query({
    where: { id: { in: routineExercises.map((re) => re.exerciseId) } },
  });

  const routineWithExercises = routines.map((routine) => {
    const _routineExercises = routineExercises.filter((re) => re.routineId === routine.id);
    const _exercises = exercises.filter((e) =>
      _routineExercises.map((re) => re.exerciseId).includes(e.id)
    );
    return {
      ...routine,
      routineExercises: _routineExercises.map((re) => ({
        ...re,
        exercise: _exercises.find((e) => e.id === re.exerciseId),
      })),
    };
  });

  return routineWithExercises;
}

export async function getRoutine(id: number) {
  const routine = await routineRepository.find(id);
  if (!routine || routine.isDeleted) return null;

  const routineExercises = await routineExerciseRepository.query({
    where: { routineId: { equals: id }, isDeleted: { equals: false } },
  });
  const exercises = await exerciseRepository.query({
    where: {
      id: { in: routineExercises.map((re) => re.exerciseId) },
      isDeleted: { equals: false },
    },
  });
  const routineExerciseSets = await routineExerciseSetRepository.query({
    where: {
      routineExerciseId: { in: routineExercises.map((re) => re.id) },
      isDeleted: {
        equals: false,
      },
    },
  });

  return {
    ...routine,
    routineExercises: routineExercises
      .map((re) => ({
        ...re,
        exercise: exercises.find((e) => e.id === re.exerciseId),
        sets: routineExerciseSets
          .filter((res) => res.routineExerciseId === re.id)
          .sort((a, b) => a.setNumber - b.setNumber),
      }))
      .sort((a, b) => a.position - b.position),
  };
}

export async function updateRoutine(routine: TRoutine) {
  const _routine = await routineRepository.update(routine);
  const _routineExercises = routine.routineExercises.filter(
    (re) => !(re.id === 0 && re.isDeleted === true)
  );
  const _routineExerciseSets = _routineExercises.flatMap((re) =>
    re.sets.filter((res) => !(res.id === 0 && res.isDeleted === true))
  );
  await routineExerciseRepository.databaseLayer.bulkInsertOrReplace(_routineExercises);
  await routineExerciseSetRepository.databaseLayer.bulkInsertOrReplace(_routineExerciseSets);

  return {
    ..._routine,
    routineExercises: _routineExercises
      .filter((re) => !re.isDeleted)
      .map((re) => ({
        ...re,
        sets: _routineExerciseSets
          .filter((res) => res.routineExerciseId === re.id && !res.isDeleted)
          .sort((a, b) => a.setNumber - b.setNumber),
      }))
      .sort((a, b) => a.position - b.position),
  };
}

export async function bulkUpdateRoutines(routines: IRoutine[]) {
  await routineRepository.databaseLayer.bulkInsertOrReplace(routines);
}
