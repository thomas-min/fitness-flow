import { useNavigation, useRouter } from 'expo-router';
import { EqualIcon } from 'lucide-react-native';
import { Fragment, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { bulkUpdateRoutines, getRoutines } from '../db/routine.service';

const routineListStyles = {
  container: {
    flex: 1,
  },
};

type Routines = Awaited<ReturnType<typeof getRoutines>>;
type Routine = Routines[number];

export function RoutineList() {
  const navigation = useNavigation();

  const [routines, setRoutines] = useState<Routines>([]);

  const updateRoutineOrder = async (routines: Routines) => {
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
    const unsubscribe = navigation.addListener('focus', init);
    return unsubscribe;
  }, [navigation]);

  return (
    <DraggableFlatList
      containerStyle={routineListStyles.container}
      data={routines}
      onDragEnd={({ data }) => {
        updateRoutineOrder(data);
      }}
      renderItem={({ item, drag }) => <Item routine={item} drag={drag} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

interface ItemProps {
  routine: Routine;
  drag: () => void;
}

function Item({ routine, drag }: ItemProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/edit-routine?id=${routine.id}`);
  };

  return (
    <ScaleDecorator activeScale={0.95}>
      <View className="p-4">
        <View className="flex-row items-center gap-4">
          <Pressable onLongPress={drag}>
            <EqualIcon className="text-gray-800" />
          </Pressable>
          <Pressable onPress={handlePress} className="flex-1 active:opacity-50">
            <Text className="text-lg font-bold">{routine.name}</Text>
            <View className="flex-row flex-wrap">
              {routine.routineExercises.map((re, idx) => {
                return (
                  <Fragment key={re.id}>
                    <Text className="text-sm">{re?.exercise?.name}</Text>
                    {idx !== routine.routineExercises.length - 1 && <Text>, </Text>}
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
