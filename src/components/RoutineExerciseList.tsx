import { produce } from 'immer';
import { EqualIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction } from 'react';
import { Pressable, Text, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

import { IRoutineExerciseSet } from '../db/routine.model';
import { getRoutine } from '../services/routine.service';

import { TextInput } from '@/src/components/ui/TextInput';
import { IExercise } from '@/src/db/exercise.model';

type Routine = NonNullable<Awaited<ReturnType<typeof getRoutine>>>;

interface Props {
  routine: Routine;
  setRoutine: Dispatch<SetStateAction<Routine>>;
}
export function RoutineExerciseList({ routine, setRoutine }: Props) {
  const { routineExercises } = routine;

  const updateSet = (exercise: IExercise, set: IRoutineExerciseSet) => {
    setRoutine((prev) =>
      produce(prev, (draft) => {
        const routineExercise = draft.routineExercises.find(
          (routineExercise) =>
            routineExercise.exerciseId === exercise.id && !routineExercise.isDeleted
        );
        const routineExerciseSet = routineExercise?.sets.find(
          (routineExerciseSet) => routineExerciseSet.setNumber === set.setNumber
        );
        if (!routineExerciseSet) return;

        routineExerciseSet.exerciseUnitValue = set.exerciseUnitValue;
        routineExerciseSet.repCount = set.repCount;
      })
    );
  };

  const pushSet = (exercise: IExercise) => {
    setRoutine((prev) =>
      produce(prev, (draft) => {
        const routineExercise = draft.routineExercises.find(
          (routineExercise) =>
            routineExercise.exerciseId === exercise.id && !routineExercise.isDeleted
        );
        const lastRoutineExerciseSet = routineExercise?.sets
          .filter((set) => !set.isDeleted)
          .slice(-1)[0];

        routineExercise?.sets.push({
          id: 0,
          routineExerciseId: routineExercise?.id,
          setNumber: lastRoutineExerciseSet?.setNumber ? lastRoutineExerciseSet.setNumber + 1 : 1,
          exerciseUnitValue: lastRoutineExerciseSet?.exerciseUnitValue,
          repCount: lastRoutineExerciseSet?.repCount,
        });
      })
    );
  };

  const popSet = (exercise: IExercise) => {
    setRoutine((prev) =>
      produce(prev, (draft) => {
        const routineExercise = draft.routineExercises.find(
          (routineExercise) =>
            routineExercise.exerciseId === exercise.id && !routineExercise.isDeleted
        );
        const lastSet = routineExercise?.sets.filter((set) => !set.isDeleted).slice(-1)[0];
        if (!lastSet) return;
        lastSet.isDeleted = true;
      })
    );
  };

  return (
    <DraggableFlatList
      containerStyle={{ flex: 1 }}
      data={routineExercises.filter((re) => !re.isDeleted)}
      onDragEnd={({ data }) => {
        setRoutine((prev) =>
          produce(prev, (draft) => {
            draft.routineExercises = data.map((item, idx) => ({
              ...item,
              position: idx,
            }));
          })
        );
      }}
      keyExtractor={(item) => item.exerciseId.toString()}
      renderItem={({ item, drag }) => {
        if (!item.exercise) return null;

        return (
          <Item
            exercise={item.exercise}
            routineSets={item.sets}
            updateSet={updateSet}
            pushSet={pushSet}
            popSet={popSet}
            drag={drag}
          />
        );
      }}
    />
  );
}

interface ItemProps {
  exercise: IExercise;
  routineSets: IRoutineExerciseSet[];
  updateSet: (exercise: IExercise, set: IRoutineExerciseSet) => void;
  pushSet: (exercise: IExercise) => void;
  popSet: (exercise: IExercise) => void;
  drag: () => void;
}

function Item({ exercise, routineSets, updateSet, pushSet, popSet, drag }: ItemProps) {
  return (
    <ScaleDecorator activeScale={0.95}>
      <View className="mb-4 py-2 active:opacity-50">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-base font-semibold">{exercise.name}</Text>
          <Pressable className="p-1" onLongPress={drag}>
            <EqualIcon className="text-gray-500" size={16} />
          </Pressable>
        </View>
        <View>
          {routineSets
            .filter((set) => !set.isDeleted)
            .map((set) => (
              <RoutineSet
                exercise={exercise}
                set={set}
                updateSet={updateSet}
                key={`${exercise.id}-${set.setNumber}`}
              />
            ))}
        </View>
        <View className="flex-row gap-2 pt-6">
          <Pressable
            className="flex-1 rounded border border-gray-200 p-2 active:opacity-50"
            onPress={() => popSet(exercise)}>
            <Text className="text-center">- 세트 삭제</Text>
          </Pressable>
          <Pressable
            className="flex-1 rounded border border-gray-200 p-2 active:opacity-50"
            onPress={() => pushSet(exercise)}>
            <Text className="text-center">+ 세트 추가</Text>
          </Pressable>
        </View>
      </View>
    </ScaleDecorator>
  );
}

interface RoutineSetProps {
  exercise: IExercise;
  set: IRoutineExerciseSet;
  updateSet: (exercise: IExercise, set: IRoutineExerciseSet) => void;
}

function RoutineSet({ exercise, set, updateSet }: RoutineSetProps) {
  const handleExerciseUnitValueChange = (text: string) => {
    updateSet(exercise, { ...set, exerciseUnitValue: text });
  };

  const handleRepCountChange = (text: string) => {
    updateSet(exercise, { ...set, repCount: +text });
  };

  return (
    <View className="flex-row items-center justify-between gap-1 py-1">
      <Text className="text-center">{set.setNumber}세트</Text>
      <View className="flex-1" />
      <TextInput
        className="flex-1 py-2 text-right"
        keyboardType="decimal-pad"
        value={set.exerciseUnitValue?.toString()}
        onChangeText={handleExerciseUnitValueChange}
      />
      <Text className="">{exercise.unit}</Text>
      <TextInput
        className="flex-1 py-2 text-right"
        keyboardType="number-pad"
        value={set.repCount?.toString()}
        onChangeText={handleRepCountChange}
      />
      <Text className="text-center">회</Text>
    </View>
  );
}
