import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

export function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      className={`h-7 w-7 items-center justify-center rounded-full border ${
        checked ? "border-black bg-black" : "border-border-strong bg-inherit"
      }`}
    >
      {checked ? (
        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
      ) : (
        <View />
      )}
    </Pressable>
  );
}

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isDone = status === "completed";

  return (
    <View
      className={`flex-row items-center rounded-full  px-2 py-0.5 ${
        isDone ? "bg-green-400" : "bg-gray-300"
      }`}
    >
      <View
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          isDone ? "bg-black" : "bg-gray-500"
        }`}
      />

      <Text className="text-[11px] font-medium">
        {isDone ? "Completed" : "Pending"}
      </Text>
    </View>
  );
}
