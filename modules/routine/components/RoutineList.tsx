import { EqualIcon } from 'lucide-react-native';
import { Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { useRoutineModelActions, useRoutines } from '../hooks/useRoutineModelStore';
import { IRoutine } from '../models';

import { IExercise } from '@/modules/exercise/models';

const routineListStyles = {
  container: {
    flex: 1,
  },
};

export function RoutineList() {
  const routines = useRoutines();
  const { updateRoutineOrder } = useRoutineModelActions();

  return (
    <DraggableFlatList
      containerStyle={routineListStyles.container}
      data={routines}
      onDragEnd={({ data }) => {
        updateRoutineOrder(data);
      }}
      renderItem={({ item, drag }) => (
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
            <EqualIcon className="text-gray-800" />
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
