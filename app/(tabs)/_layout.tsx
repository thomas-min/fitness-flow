import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/modules/common/configs/Colors';
import { CalendarIcon, DumbbellIcon, GanttChartIcon } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: '일지',
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          headerShown: false,
          title: '루틴',
          tabBarIcon: ({ color }) => <GanttChartIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          headerShown: false,
          title: '운동',
          tabBarIcon: ({ color }) => <DumbbellIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
