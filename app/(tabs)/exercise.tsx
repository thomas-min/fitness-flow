import React from 'react';
import { Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ExerciseScreenHeader } from '@/src/components/ExerciseScreenHeader';
import { ExerciseSwipeList } from '@/src/components/ExerciseSwipeList';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExerciseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ExerciseScreenHeader />
      <ExerciseSwipeList />
    </SafeAreaView>
  );
}
