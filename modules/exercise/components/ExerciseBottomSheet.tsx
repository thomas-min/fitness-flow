import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { produce } from 'immer';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction, forwardRef, useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo, Pressable, Text, View } from 'react-native';

import { IExercise, exerciseRepository } from '../models';

import { BODY_PARTS_IN_KOREAN } from '@/modules/exercise/configs';
import { getRoutine } from '@/modules/routine/utils';

const snapPoints = ['50%'];
const style = {
  borderRadius: 24,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.36,
  shadowRadius: 6.68,

  elevation: 11,
};

type Routine = NonNullable<Awaited<ReturnType<typeof getRoutine>>>;

interface Props {
  routine: Routine;
  setRoutine: Dispatch<SetStateAction<Routine>>;
}

export const ExerciseBottomSheet = forwardRef<BottomSheet, Props>(function ExerciseBottomSheet(
  { routine, setRoutine },
  ref
) {
  const [exercises, setExercises] = useState<IExercise[]>([]);

  const fetchExercises = useCallback(async () => {
    const found = await exerciseRepository.query({
      where: { isDeleted: { equals: false } },
    });
    setExercises(found);
  }, []);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <BottomSheet ref={ref} style={style} enablePanDownToClose snapPoints={snapPoints} index={-1}>
      <BottomSheetFlatList
        className="ios:mb-5"
        data={exercises.slice().sort((a, b) => a.name.localeCompare(b.name))}
        renderItem={(props) => {
          const isSelected = routine.routineExercises.some((re) => re.exerciseId === props.item.id);
          const onPress = () => {
            if (isSelected) {
              setRoutine((prev) =>
                produce(prev, (draft) => {
                  const index = draft.routineExercises.findIndex(
                    (re) => re.exerciseId === props.item.id
                  );
                  draft.routineExercises.splice(index, 1);
                })
              );
            } else {
              setRoutine((prev) =>
                produce(prev, (draft) => {
                  draft.routineExercises.push({
                    id: 0,
                    routineId: routine.id,
                    exerciseId: props.item.id,
                    sets: [],
                    exercise: exercises.find((e) => e.id === props.item.id),
                    position: draft.routineExercises.length + 1,
                  });
                })
              );
            }
          };

          return <Item isSelected={isSelected} onPress={onPress} {...props} key={props.item.id} />;
        }}
      />
    </BottomSheet>
  );
});

function Item({
  item,
  isSelected,
  onPress,
}: ListRenderItemInfo<IExercise> & {
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="mx-5 flex-row items-center py-2 active:opacity-50">
      <View className="flex-1">
        <Text className="flex-1 text-base font-semibold">{item.name}</Text>
        <Text className="text-sm text-gray-500">{BODY_PARTS_IN_KOREAN[item.bodyPart]}</Text>
      </View>
      {isSelected ? (
        <CheckCircle2Icon className="text-blue-500" size={18} />
      ) : (
        <CircleIcon className="text-gray-300" size={18} />
      )}
    </Pressable>
  );
}
