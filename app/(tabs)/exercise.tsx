import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyPartSection } from '@/modules/exercise/components/BodyPartSection';
import { ExerciseScreenHeader } from '@/modules/exercise/components/ExerciseScreenHeader';
import { BODY_PARTS } from '@/modules/exercise/configs';
import { useExerciseModelActions } from '@/modules/exercise/hooks/useExerciseModelStore';
import { useExerciseViewActions } from '@/modules/exercise/hooks/useExerciseViewStore';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExerciseScreen() {
  const { setMode } = useExerciseViewActions();
  const { seed } = useExerciseModelActions();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMode('view');
      seed();
    });
    return unsubscribe;
  }, [navigation, seed, setMode]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ExerciseScreenHeader />
      <ScrollView className="flex-1 px-4">
        {BODY_PARTS.map((bodyPart) => (
          <BodyPartSection key={bodyPart} bodyPart={bodyPart} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
