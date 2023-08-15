import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, EqualIcon, PlusIcon } from 'lucide-react-native';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Divider } from '@/modules/common/components/Divider';
import { TextInput } from '@/modules/common/components/TextInput';
import { cn } from '@/modules/common/utils/cn';
import { ExerciseBottomSheet } from '@/modules/exercise/components/ExerciseBottomSheet';
import { IExercise } from '@/modules/exercise/models';
import { IRoutineSet } from '@/modules/routine/models';
import { getRoutine, getRoutineSets } from '@/modules/routine/utils';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EditRoutineScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [name, setName] = useState('');
  const [routineExercises, setRoutineExercises] = useState<IExercise[]>([]);
  const [routineSets, setRoutineSets] = useState<IRoutineSet[]>([]);

  const reset = () => {
    setName('');
    setRoutineExercises([]);
  };

  useEffect(() => {
    const init = async () => {
      if (!params.id) {
        reset();
        return;
      }

      const [routine, routineSets] = await Promise.all([
        getRoutine(+params.id),
        getRoutineSets({
          where: {
            routineId: +params.id,
          },
        }),
      ]);

      if (!routine) {
        reset();
        return;
      }

      setName(routine.name);
      setRoutineExercises(routine.exercises);
      setRoutineSets(routineSets);
    };

    init();
  }, [params.id]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative flex flex-row items-center justify-center">
        <Pressable onPress={router.back} className="absolute left-4 rounded p-1 active:opacity-50">
          <ArrowLeft className="text-gray-900" size={24} />
        </Pressable>
        <Text className="text-xl font-bold">루틴 {params.id ? '수정' : '추가'}</Text>
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="flex-1 p-4">
          <TextInput.Label>이름</TextInput.Label>
          <TextInput value={name} onChangeText={setName} className="mb-4" />
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="mt-4 text-base font-bold">운동</Text>
            <Pressable
              onPress={() => bottomSheetRef.current?.expand()}
              className="p-1 active:opacity-50">
              <PlusIcon className="text-gray-900" size={16} />
            </Pressable>
          </View>
          <Divider />
          <View className="h-2" />
          <RoutineExerciseList
            routineExercises={routineExercises}
            routineSets={routineSets}
            setRoutineSets={setRoutineSets}
          />
        </ScrollView>
        <View className="ios:pb-2 p-4">
          <Pressable className={cn('rounded-lg bg-blue-500 px-4 py-3 active:opacity-50', {})}>
            <Text className="text-center text-lg font-bold text-white">저장</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <ExerciseBottomSheet
        ref={bottomSheetRef}
        selected={routineExercises}
        setSelected={setRoutineExercises}
      />
    </SafeAreaView>
  );
}

interface RoutineExerciseListProps {
  routineExercises: IExercise[];
  routineSets: IRoutineSet[];
  setRoutineSets: Dispatch<SetStateAction<IRoutineSet[]>>;
}

function RoutineExerciseList({
  routineExercises,
  routineSets,
  setRoutineSets,
}: RoutineExerciseListProps) {
  const params = useLocalSearchParams();

  const pushNewSet = (exerciseId: number) => {
    setRoutineSets((prev) => {
      const lastSet = prev
        .filter((set) => set.exerciseId === exerciseId)
        .sort((a, b) => b.setNumber - a.setNumber)[0];
      const newSet = {
        id: 0,
        routineId: +params.id,
        exerciseId,
        setNumber: lastSet ? lastSet.setNumber + 1 : 1,
        repCount: 0,
      };

      return [...prev, newSet];
    });
  };

  const removeLastSet = (exerciseId: number) => {
    setRoutineSets((prev) => {
      if (prev.length === 0) return prev;

      const lastSet = prev
        .filter((set) => set.exerciseId === exerciseId)
        .sort((a, b) => b.setNumber - a.setNumber)[0];

      return prev.filter(
        (set) => !(set.exerciseId === lastSet.exerciseId && set.setNumber === lastSet.setNumber)
      );
    });
  };

  return (
    <>
      {routineExercises.map((exercise) => (
        <View key={exercise.id} className="mb-8 py-2 active:opacity-50">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-base font-semibold">{exercise.name}</Text>
            <Pressable className="p-1">
              <EqualIcon className="text-gray-500" size={16} />
            </Pressable>
          </View>
          <View>
            {routineSets
              .filter((set) => set.exerciseId === exercise.id)
              .map((set, idx) => (
                <View key={idx} className="flex-row gap-1">
                  <Text className="text-center">{set.setNumber}</Text>
                  <Text className="text-center">{set.repCount}</Text>
                </View>
              ))}
          </View>
          <View className="flex-row gap-2 pt-6">
            <Pressable
              onPress={() => removeLastSet(exercise.id)}
              className="flex-1 rounded border border-gray-200 p-2 active:opacity-50">
              <Text className="text-center">- 세트 삭제</Text>
            </Pressable>
            <Pressable
              onPress={() => pushNewSet(exercise.id)}
              className="flex-1 rounded border border-gray-200 p-2 active:opacity-50">
              <Text className="text-center">+ 세트 추가</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </>
  );
}
