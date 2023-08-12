import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, UIManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyPartSection } from '@/modules/exercise/components/BodyPartSection';
import { ExerciseScreenHeader } from '@/modules/exercise/components/ExerciseScreenHeader';
import { BODY_PARTS } from '@/modules/exercise/configs';
import { useExerciseViewActions } from '@/modules/exercise/hooks/useExerciseScreenStore';
import { IExercise } from '@/modules/exercise/models';
import { getExercises } from '@/modules/exercise/utils';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExerciseScreen() {
  const { setMode } = useExerciseViewActions();
  const navigation = useNavigation();

  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setMode('view');
      setExercises(
        await getExercises({
          order: {
            id: 'ASC',
          },
        })
      );
    });
    return unsubscribe;
  }, [navigation, setMode]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ExerciseScreenHeader />
      {/* TODO: replace with section list */}
      <ScrollView className="flex-1 px-4">
        {BODY_PARTS.map((bodyPart) => (
          <BodyPartSection
            key={bodyPart}
            bodyPart={bodyPart}
            exercises={exercises}
            setExercises={setExercises}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
