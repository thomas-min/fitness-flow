import { TextInput as RNTextInput, TextInputProps, TextProps, Text } from 'react-native';
import { cn } from '../utils/cn';

function TextInput(props: TextInputProps) {
  const { className, ...rest } = props;

  return (
    <RNTextInput
      className={cn('bg-gray-100 px-3 py-4 rounded-lg border-gray-150', className)}
      {...rest}
    />
  );
}

function Label(props: TextProps) {
  const { className, children } = props;

  return <Text className={cn('text-base font-bold pb-2', className)}> {children} </Text>;
}

TextInput.Label = Label;

export { TextInput };
