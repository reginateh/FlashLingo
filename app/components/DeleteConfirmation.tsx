import { Modal, Text, View } from "react-native";
import Button from "./button";

type DeleteConfirmationProps = {
  name: string;
  visible: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
};
const DeleteConfirmation = ({
  name,
  visible,
  onDelete,
  onCancel,
}: DeleteConfirmationProps) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
        <View className="bg-white p-6 rounded-md">
          <Text>Are you sure you want to delete this {name}?</Text>
          <View className="flex-row justify-around mt-4">
            <Button bg="dp" onPress={onDelete} text="Delete" size="sm" />
            <Button bg="lp" onPress={onCancel} text="Cancel" size="sm" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmation;
