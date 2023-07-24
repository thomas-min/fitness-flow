import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';

export const Divider = function Divider({ className }: { className?: string }) {
  return <View className={clsx(`border-b border-px border-gray-300`, className)}></View>;
};
