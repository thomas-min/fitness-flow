import 'react-native-get-random-values';
import { Platform, Pressable, UIManager, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { BODY_PARTS_IN_KOREAN } from '@/modules/exercise/configs';
import { TBodyPart } from '@/modules/exercise/models';
import { TextInput } from '@/modules/common/components/TextInput';
import { useExerciseModelActions } from '@/modules/exercise/hooks/useExerciseModelStore';
import { cn } from '@/modules/common/utils/cn';
import { uid } from '@/modules/common/utils/uid';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EditExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bodyPart = BODY_PARTS_IN_KOREAN[params.bodyPart as TBodyPart];

  const { updateExercise, addExercise } = useExerciseModelActions();

  const [name, setName] = useState(params.name?.toString() ?? '');
  const [unit, setUnit] = useState('kg');

  const handleSubmit = () => {
    if (params.id) {
      updateExercise({
        id: params.id.toString(),
        name,
        unit,
        bodyPart: params.bodyPart as TBodyPart,
      });
    } else {
      addExercise({
        id: uid(),
        name,
        unit,
        bodyPart: params.bodyPart as TBodyPart,
      });
    }
    router.back();
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex relative flex-row justify-center items-center">
        <Pressable onPress={router.back} className="absolute left-4 p-1 active:opacity-70 rounded">
          <ArrowLeft className="text-gray-900" size={24} />
        </Pressable>
        <Text className="text-xl font-bold">운동 {params.id ? '수정' : '추가'}</Text>
      </View>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="flex-1 p-4">
          <TextInput.Label>그룹</TextInput.Label>
          <TextInput value={bodyPart} editable={false} className="mb-4" />
          <TextInput.Label>이름</TextInput.Label>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="운동의 이름을 입력하세요"
            autoFocus
            className="mb-4"
          />
          <TextInput.Label>단위</TextInput.Label>
          <TextInput value={unit} onChangeText={setUnit} placeholder="운동의 단위를 입력하세요" />
        </ScrollView>
        <View className="p-4">
          <Pressable
            onPress={handleSubmit}
            disabled={!name || !unit}
            className={cn('bg-blue-500 px-4 py-3 rounded-lg active:opacity-70', {
              'opacity-50': !name || !unit,
            })}>
            <Text className="text-white font-bold text-lg text-center">저장</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
