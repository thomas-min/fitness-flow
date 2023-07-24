import React, { useState } from 'react';
import { View, Text, Platform, UIManager, LayoutAnimation } from 'react-native';
import Calendar from 'react-native-swipe-calendar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TabTwoScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="h-120">
        <Text></Text>
        <Calendar
          HeaderComponent={() => <></>}
          currentDate={currentDate}
          onDateSelect={(date, { isSelected }) => setSelectedDate(isSelected ? null : date)}
          onPageChange={(date) => {
            setCurrentDate(date);
            setSelectedDate(date);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}
          DayLabelComponent={DayLabelComponent}
          selectedDate={selectedDate}
        />
        <View className="border-b border-px border-gray-300"></View>
      </View>
      <View className="flex-1 bg-red-500">
        <Text>test</Text>
      </View>
    </SafeAreaView>
  );
}

const DayLabelComponent = ({ date }: { date: Date }) => {
  return (
    <View className="flex justify-center items-center">
      <Text>{format(date, 'EE', { locale: ko })}</Text>
    </View>
  );
};
