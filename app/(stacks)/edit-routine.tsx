import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, PlusIcon } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, UIManager, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RoutineExerciseList } from '../../modules/routine/components/RoutineExerciseList';

import { Divider } from '@/modules/common/components/Divider';
import { TextInput } from '@/modules/common/components/TextInput';
import { cn } from '@/modules/common/utils/cn';
import { ExerciseBottomSheet } from '@/modules/exercise/components/ExerciseBottomSheet';
import { createRoutine, getRoutine } from '@/modules/routine/utils';

type Routine = NonNullable<Awaited<ReturnType<typeof getRoutine>>>;

const emptyRoutine: Routine = {
  id: 0,
  position: 0,
  name: '',
  routineExercises: [],
};

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EditRoutineScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [routine, setRoutine] = useState<Routine>(emptyRoutine);

  const handleNameChange = (text: string) => {
    setRoutine((prev) => ({ ...prev, name: text }));
  };

  const reset = () => {
    setRoutine(emptyRoutine);
  };

  const handleSave = async () => {
    // TODO: save
    if (+params.id) {
      // TODO: update
    } else {
      await createRoutine(routine);
    }
    router.back();
  };

  useEffect(() => {
    const init = async () => {
      if (!params.id) {
        reset();
        return;
      }

      const routine = await getRoutine(+params.id);

      if (!routine) {
        reset();
        return;
      }

      setRoutine(routine);
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
        <View className="flex-1 p-4">
          <TextInput.Label>이름</TextInput.Label>
          <TextInput value={routine?.name} onChangeText={handleNameChange} className="mb-4" />
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
          <RoutineExerciseList routine={routine} setRoutine={setRoutine} />
        </View>
        <View className="ios:pb-2 p-4 pt-2">
          <Pressable
            className={cn('rounded-lg bg-blue-500 px-4 py-3 active:opacity-50', {})}
            onPress={handleSave}>
            <Text className="text-center text-lg font-bold text-white">저장</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <ExerciseBottomSheet ref={bottomSheetRef} routine={routine} setRoutine={setRoutine} />
    </SafeAreaView>
  );
}
