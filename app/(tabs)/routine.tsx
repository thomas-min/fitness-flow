import React from 'react';
import { Platform, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RoutineList } from '@/src/components/RoutineList';
import { RoutineScreenHeader } from '@/src/components/RoutineScreenHeader';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RoutineScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <RoutineScreenHeader />
      <View className="flex-1">
        <RoutineList />
      </View>
    </SafeAreaView>
  );
}
