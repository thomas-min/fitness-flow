import { RoutineList } from '@/modules/routine/components/RoutineList';
import { RoutineScreenHeader } from '@/modules/routine/components/RoutineScreenHeader';
import { useRoutineModelActions } from '@/modules/routine/hooks/useRoutineModelStore';
import React, { useEffect } from 'react';
import { Platform, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RoutineScreen() {
  const { seed } = useRoutineModelActions();

  useEffect(() => {
    seed();
  }, [seed]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <RoutineScreenHeader />
      <View className="flex-1">
        <RoutineList />
      </View>
    </SafeAreaView>
  );
}
