import { useRouter } from 'expo-router';
import { EqualIcon } from 'lucide-react-native';
import { Fragment, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { IRoutine, IRoutineWithExercises } from '../models';
import { bulkUpdateRoutines, getRoutines } from '../utils/sql';

import { IExercise } from '@/modules/exercise/models';

const routineListStyles = {
  container: {
    flex: 1,
  },
};

export function RoutineList() {
  const [routines, setRoutines] = useState<IRoutineWithExercises[]>([]);

  const updateRoutineOrder = async (routines: IRoutineWithExercises[]) => {
    setRoutines(routines);
    await bulkUpdateRoutines(
      routines.map((routine, idx) => ({
        id: routine.id,
        name: routine.name,
        isDeleted: routine.isDeleted,
        position: idx,
      }))
    );
  };

  useEffect(() => {
    const init = async () => {
      const routines = await getRoutines({
        order: {
          position: 'ASC',
        },
      });
      setRoutines(routines);
    };
    init();
  }, []);

  return (
    <>
      <DraggableFlatList
        containerStyle={routineListStyles.container}
        data={routines}
        onDragEnd={({ data }) => {
          updateRoutineOrder(data);
        }}
        renderItem={({ item, drag }) => (
          <Item routine={item} drag={drag} exercises={item.exercises} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}

interface ItemProps {
  routine: IRoutine;
  exercises: IExercise[];
  drag: () => void;
}

function Item({ routine, exercises, drag }: ItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/edit-routine?id=${routine.id}`);
  };

  return (
    <ScaleDecorator>
      <View className="p-4">
        <View className="flex-row items-center gap-4">
          <Pressable onLongPress={drag}>
            <EqualIcon className="text-gray-800" />
          </Pressable>
          <Pressable onPress={handlePress} className="flex-1 active:opacity-50">
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
