import { IExercise } from '@/modules/exercise/models';
import { useRoutines } from '../hooks/useRoutineModelStore';
import { IRoutine } from '../models';
import { View, Text, Pressable } from 'react-native';
import { MenuIcon } from 'lucide-react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { Fragment } from 'react';

export function RoutineList() {
  const routines = useRoutines();

  return (
    <DraggableFlatList
      containerStyle={{ flex: 1 }}
      data={routines}
      renderItem={({ item, drag, isActive }) => (
        <Item routine={item} exercises={item.exercises} drag={drag} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

interface ItemProps {
  routine: IRoutine;
  exercises: IExercise[];
  drag: () => void;
}

function Item({ routine, exercises, drag }: ItemProps) {
  return (
    <ScaleDecorator>
      <View className="p-4">
        <View className="flex-row items-center gap-4">
          <Pressable onLongPress={drag}>
            <MenuIcon className="text-gray-800" />
          </Pressable>
          <Pressable className="flex-1 active:opacity-50">
            <Text className="text-lg font-bold">{routine.name}</Text>
            <View className="flex-row flex-wrap">
              {exercises.map((exercise, idx) => {
                return (
                  <Fragment key={exercise.id}>
                    <Text className="text-sm">{exercise?.name}</Text>
                    {idx !== exercises.length - 1 && <Text>, </Text>}
                  </Fragment>
                );
              })}
            </View>
          </Pressable>
        </View>
      </View>
    </ScaleDecorator>
  );
}
