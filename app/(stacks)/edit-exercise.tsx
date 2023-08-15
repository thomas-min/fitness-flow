import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, UIManager, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Picker } from '@/modules/common/components/Picker';
import { TextInput } from '@/modules/common/components/TextInput';
import { cn } from '@/modules/common/utils/cn';
import { BODY_PARTS_IN_KOREAN } from '@/modules/exercise/configs';
import { IExercise, TBodyPart } from '@/modules/exercise/models';
import { createExercise, getExercise, updateExercise } from '@/modules/exercise/utils';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const emptyExercise: Omit<IExercise, 'bodyPart'> & {
  bodyPart: TBodyPart | undefined;
} = {
  id: 0,
  bodyPart: undefined,
  name: '',
  unit: '',
};
const bodyPartOptions = [
  ...Object.entries(BODY_PARTS_IN_KOREAN).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function EditExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [exercise, setExercise] = useState<
    Omit<IExercise, 'bodyPart'> & {
      bodyPart: TBodyPart | undefined;
    }
  >(emptyExercise);

  const fetchExercise = useCallback(async () => {
    if (!params.id) {
      setExercise(emptyExercise);
      return;
    }

    const found = await getExercise(+params.id);
    if (!found) return;

    setExercise(found);
  }, [params.id]);

  const submitDisabled = !exercise.name || !exercise.bodyPart;

  const handleSubmit = () => {
    if (!exercise.name || !exercise.bodyPart) return;

    if (exercise.id && exercise.bodyPart) {
      updateExercise({ ...exercise, bodyPart: exercise.bodyPart });
    } else {
      createExercise({ ...exercise, bodyPart: exercise.bodyPart });
    }
    router.back();
  };

  useEffect(() => {
    fetchExercise();
  }, [fetchExercise]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative flex flex-row items-center justify-center">
        <Pressable className="absolute left-4 rounded p-1 active:opacity-50" onPress={router.back}>
          <ArrowLeft className="text-gray-900" size={24} />
        </Pressable>
        <Text className="text-xl font-bold">운동 {params.id ? '수정' : '추가'}</Text>
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="flex-1 p-4">
          <TextInput.Label>그룹</TextInput.Label>
          <Picker
            style={{ marginBottom: 16 }}
            modalTitle="그룹 선택"
            placeholder="운동의 그룹을 선택하세요"
            initialOption={
              exercise.bodyPart && {
                value: exercise.bodyPart,
                label: BODY_PARTS_IN_KOREAN[exercise.bodyPart as TBodyPart],
              }
            }
            options={bodyPartOptions}
            onChange={(option) =>
              setExercise((prev) => ({ ...prev, bodyPart: option.value as TBodyPart }))
            }
          />
          <TextInput.Label>이름</TextInput.Label>
          <TextInput
            className="mb-4"
            value={exercise.name}
            onChangeText={(name) => setExercise((prev) => ({ ...prev, name }))}
            placeholder="운동의 이름을 입력하세요"
          />
          <TextInput.Label>단위</TextInput.Label>
          <TextInput
            value={exercise.unit}
            onChangeText={(unit) => setExercise((prev) => ({ ...prev, unit }))}
            placeholder="운동의 단위를 입력하세요"
          />
        </ScrollView>
        <View className="ios:pb-2 p-4">
          <Pressable
            className={cn('rounded-lg bg-blue-500 px-4 py-3 active:opacity-50', {
              'opacity-50': submitDisabled,
            })}
            onPress={handleSubmit}
            disabled={submitDisabled}>
            <Text className="text-center text-lg font-bold text-white">저장</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
