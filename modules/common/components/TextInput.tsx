import { TextInput as RNTextInput, TextInputProps, TextProps, Text } from 'react-native';
import { cn } from '../utils/cn';

function TextInput(props: TextInputProps) {
  const { className, ...rest } = props;

  return (
    <RNTextInput
      className={cn('border-gray-150 rounded-lg bg-gray-100 px-3 py-4', className)}
      {...rest}
    />
  );
}

function Label(props: TextProps) {
  const { className, children } = props;

  return <Text className={cn('pb-2 text-base font-bold', className)}> {children} </Text>;
}

TextInput.Label = Label;

export { TextInput };
