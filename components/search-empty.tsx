import { Pressable, Text, TextInput, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search tasks",
}: SearchBarProps) {
  return (
    <View className="mx-4 flex-row items-center rounded-2xl border border-border bg-inherit px-3">
      <Ionicons name="search" size={16} color="#8E8E93" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        autoCorrect={false}
        autoCapitalize="none"
        className="flex-1 px-2 py-3 text-[14px] text-black"
      />

      {value.length > 0 && (
        <Pressable onPress={() => onChange("")} hitSlop={8}>
          <Feather name="delete" size={18} color="black" />
        </Pressable>
      )}
    </View>
  );
}

interface EmptyStateProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="h-16 w-16 items-center justify-center rounded-2xl">
        <Ionicons name="checkmark-done-outline" size={28} color="#111111" />
      </View>

      <Text className="mt-4 text-center text-[18px] font-semibold text-black">
        {title}
      </Text>

      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          className="mt-5 rounded-full bg-black px-5 py-3 active:bg-black"
        >
          <Text className="text-[14px] font-semibold text-white">
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}
