import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { IExercise, exerciseRepository } from '@/src/db/exercise.model';
import { DEFAULT_EXERCISES } from '@/src/db/exercise.seed';
import {
  routineExerciseRepository,
  routineExerciseSetRepository,
  routineRepository,
} from '@/src/db/routine.model';
import {
  DEFAULT_ROUTINES,
  DEFAULT_ROUTINE_EXERCISES,
  DEFAULT_ROUTINE_EXERCISE_SETS,
} from '@/src/db/routine.seed';
import { migrations } from '@/src/db/schema';

export default function TestScreen() {
  const [exercise, setExercise] = useState<IExercise[]>([]);

  const onPressRunMigrations = async () => {
    await migrations.migrate();
  };

  const onPressReset = async () => {
    await migrations.reset();
    setExercise([]);
  };

  const onPressQuery = () => {
    exerciseRepository.query({ where: { unit: { equals: 'kg' } } }).then((found) => {
      setExercise(found);
    });
  };

  const seed = async () => {
    await exerciseRepository.databaseLayer.bulkInsertOrReplace(DEFAULT_EXERCISES);
    await routineRepository.databaseLayer.bulkInsertOrReplace(DEFAULT_ROUTINES);
    await routineExerciseRepository.databaseLayer.bulkInsertOrReplace(DEFAULT_ROUTINE_EXERCISES);
    await routineExerciseSetRepository.databaseLayer.bulkInsertOrReplace(
      DEFAULT_ROUTINE_EXERCISE_SETS
    );
  };

  return (
    <ScrollView>
      <Text onPress={onPressRunMigrations}>Migrate</Text>
      <Text onPress={onPressReset}>Reset Database</Text>
      <Text onPress={seed}>seed</Text>
      <Text onPress={onPressQuery}>query</Text>
      <Text>{JSON.stringify(exercise, null, 1)}</Text>
    </ScrollView>
  );
}
