import React from 'react';
import { Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RoutineScreen() {
  return <SafeAreaView className="flex-1 bg-white" edges={['top']}></SafeAreaView>;
}
