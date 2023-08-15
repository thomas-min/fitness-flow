import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { CheckCircle2Icon, CircleIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction, forwardRef, useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo, Pressable, Text, View } from 'react-native';

import { IExercise, exerciseRepository } from '../models';

import { BODY_PARTS_IN_KOREAN } from '@/modules/exercise/configs';

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

interface Props {
  selected: IExercise[];
  setSelected: Dispatch<SetStateAction<IExercise[]>>;
}

export const ExerciseBottomSheet = forwardRef<BottomSheet, Props>(function ExerciseBottomSheet(
  { selected, setSelected },
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
          const isSelected = selected.some((exercise) => exercise.id === props.item.id);
          const onPress = () => {
            if (isSelected) {
              setSelected(selected.filter((exercise) => exercise.id !== props.item.id));
            } else {
              setSelected([...selected, props.item]);
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
