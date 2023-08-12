import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { migrations } from '@/modules/common/db';
import { DEFAULT_EXERCISES } from '@/modules/exercise/configs';
import { IExercise, exerciseRepository } from '@/modules/exercise/models';
import { DEFAULT_ROUTINES, DEFAULT_ROUTINE_EXERCISES } from '@/modules/routine/configs';
import { routineExerciseRepository, routineRepository } from '@/modules/routine/models';

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
