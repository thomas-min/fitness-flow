import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const WorkoutScreenContainer = function WorkoutScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {children}
    </SafeAreaView>
  );
};
