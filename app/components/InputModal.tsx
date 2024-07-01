import { View, TextInput, Modal, Text } from "react-native";
import Button from "./button";
import { useState } from "react";

type InputModalProps = {
  title?: string;
  visible: boolean;
  placeholders: string[];
  initialValues: string[];
  onSave: (values: string[]) => Promise<void>;
  onCancel: () => void;
};

/**
 * An input modal component that creates a modal with input fields.
 * @param title - title to be displayed on the top of the modal
 * @param visible - boolean to determine if the modal is visible
 * @param placeholders - an array of strings to be displayed as placeholders in the input fields
 * @param initialValues - an array of strings to be displayed as initial values in the input fields
 * placeholder and initial value at the same index correspond to the same input field
 * @param onSave - function to be executed when the save button is pressed
 * @param onCancel - function to be executed when the cancel button is pressed
 */
const InputModal = ({
  title,
  visible,
  placeholders,
  initialValues,
  onSave,
  onCancel,
}: InputModalProps) => {
  const [values, setValues] = useState<string[]>(initialValues);

  const handleInputChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  const handleSave = async () => {
    setValues(initialValues);
    await onSave(values);
  };

  const handleCancel = () => {
    setValues(initialValues);
    onCancel();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View className="flex-1 justify-center items-center">
        <View className="relative w-80 p-4 bg-white rounded-lg shadow-md">
          {title ? (
            <Text className="text-xl font-bold mb-4">{title}</Text>
          ) : null}
          {placeholders.map((placeholder, index) => (
            <TextInput
              className="border p-2 mb-2"
              placeholder={placeholder}
              key={index}
              value={values[index]}
              onChangeText={(text) => handleInputChange(text, index)}
              multiline={true}
            />
          ))}
          <Button bg="lg" onPress={handleSave} text="Save" size="lg" />
          <Button bg="lp" onPress={handleCancel} text="Cancel" size="lg" />
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
