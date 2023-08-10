import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  UIManager,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TextInput } from '@/modules/common/components/TextInput';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EditRoutineScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [name, setName] = useState('');

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
