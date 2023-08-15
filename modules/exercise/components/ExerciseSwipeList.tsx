import { useNavigation } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { ExerciseItem } from './ExerciseItem';
import { BODY_PARTS, BODY_PARTS_IN_KOREAN } from '../configs';
import { IExercise, TBodyPart } from '../models';
import { deleteExercise, getExercises } from '../utils';

import { Divider } from '@/modules/common/components/Divider';

export function ExerciseSwipeList() {
  const navigation = useNavigation();

  const [exercises, setExercises] = useState<IExercise[]>([]);

  const sections = useMemo(() => {
    return BODY_PARTS.map((bodyPart) => ({
      title: bodyPart,
      data: exercises.filter((exercise) => exercise.bodyPart === bodyPart),
    })).filter((section) => section.data.length > 0);
  }, [exercises]);

  const removeExercise = (exercise: IExercise) => {
    setExercises(exercises.filter((item) => item.id !== exercise.id));
    deleteExercise(exercise);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setExercises(
        await getExercises({
          order: {
            id: 'ASC',
          },
        })
      );
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SwipeListView
      useSectionList
      className="flex-1"
      sections={sections}
      initialNumToRender={30}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => (
        <View className="px-4">
          <Text className="mb-2 bg-white px-1 text-base font-bold">
            {BODY_PARTS_IN_KOREAN[section.title as TBodyPart]}
          </Text>
          <Divider />
        </View>
      )}
      renderSectionFooter={() => <View className="h-4" />}
      renderItem={({ item }) => (
        <View className="bg-white px-4">
          <ExerciseItem exercise={item} />
        </View>
      )}
      renderHiddenItem={(data) => (
        <View className="mx-4 h-full flex-row items-center justify-end px-4">
          <Pressable
            className="active:opacity-50"
            onPress={() => {
              removeExercise(data.item);
            }}>
            <Text className="font-bold text-red-500">삭제</Text>
          </Pressable>
        </View>
      )}
      rightOpenValue={-70}
    />
  );
}
