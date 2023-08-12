import { Tabs } from 'expo-router';
import { CalendarIcon, DumbbellIcon, GanttChartIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs>
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
      <Tabs.Screen name="test" />
    </Tabs>
  );
}
