import { XIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';

import Modal from './Modal';
import { cn } from '../utils/cn';

interface IOption<T> {
  label: string;
  value: T;
}
interface Props<T> {
  style?: ViewStyle;
  options: IOption<T>[];
  modalTitle?: string;
  placeholder?: string;
  initialOption?: IOption<T>;
  onChange?: (option: IOption<T>) => void;
}

// FIXME: component height is not fixed in iOS
export function Picker<T>({
  style,
  options,
  modalTitle,
  placeholder,
  initialOption,
  onChange,
}: Props<T>) {
  const [selectedOption, setSelectedOption] = useState<IOption<T> | null>(initialOption || null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleModal() {
    setIsModalVisible((prev) => !prev);
  }

  useEffect(() => {
    setSelectedOption(initialOption || null);
  }, [initialOption]);

  return (
    <>
      <Pressable
        className="border-gray-150 rounded-lg bg-gray-100 px-3 py-4"
        style={style}
        onPress={toggleModal}>
        <Text
          className={cn('text-md text-gray-400', {
            'text-gray-900': selectedOption,
          })}>
          {selectedOption?.label || placeholder || ''}
        </Text>
      </Pressable>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        isVisible={isModalVisible}
        className="m-0 justify-end"
        onBackdropPress={toggleModal}
        backdropColor="rgba(0, 0, 0, 0.5)"
        propagateSwipe>
        <View className="ios:pb-8 max-h-80 rounded-t-xl bg-white p-5 pt-4">
          <View className="flex flex-row justify-between">
            {modalTitle ? (
              <Text className="py-1 text-xl font-bold text-gray-900">{modalTitle}</Text>
            ) : null}
            <Pressable onPress={toggleModal}>
              <XIcon className="text-gray-400" size={32} />
            </Pressable>
          </View>
          <ScrollView>
            {options.map((option, idx) => (
              <Pressable
                key={idx}
                className="my-1"
                onPress={() => {
                  toggleModal();
                  setSelectedOption(option);
                  onChange?.(option);
                }}>
                <Text className="text-base text-gray-900">{option.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
