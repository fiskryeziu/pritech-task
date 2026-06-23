import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBadge } from "@/components/checkbox";
import { useTasks } from "@/store/context";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getTaskById, toggleTask, deleteTask } = useTasks();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back" size={24} color="#111111" />
          </Pressable>
        </View>

        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-[18px] font-semibold text-black">
            Task not found
          </Text>
          <Text className="mt-1 text-center text-[13px] text-black/50">
            This task may have been deleted.
          </Text>

          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-full bg-inherit px-5 py-3"
          >
            <Text className="text-[14px] font-semibold text-black">
              Go back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isDone = task.status === "completed";

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 py-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          className="h-10 w-10 items-center justify-center"
        >
          <Ionicons name="chevron-back" size={24} color="#111111" />
        </Pressable>

        <Pressable
          onPress={async () => {
            await deleteTask(task.id);
            router.back();
          }}
          hitSlop={10}
          className="h-10 w-10 items-center justify-center"
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
      >
        <View className="flex-row items-center gap-2">
          <StatusBadge status={task.status} />
          <Text className="text-[12px]">
            Created {formatDateTime(task.createdAt)}
          </Text>
        </View>

        <Text
          className={`mt-3 text-[28px] font-bold leading-9 text-black ${
            isDone && "line-through"
          }`}
        >
          {task.title}
        </Text>

        <View className="my-5 h-px bg-border" />

        <Text className="text-[12px] font-semibold uppercase tracking-wide text-black/30">
          Description
        </Text>

        <Text className="mt-2 text-[15px] leading-6 text-black">
          {task.description || "No description provided."}
        </Text>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-border px-4 pt-3 pb-6">
        <Pressable
          onPress={() => toggleTask(task.id)}
          className={`flex-row items-center justify-center rounded-full py-3.5 ${
            isDone ? "bg-gray-200" : "bg-black active:opacity-90"
          }`}
        >
          <Ionicons
            name={isDone ? "refresh" : "checkmark"}
            size={18}
            color={isDone ? "#111111" : "#FFFFFF"}
          />

          <Text
            className={`ml-2 text-[15px] font-semibold ${
              isDone ? "text-black" : "text-white"
            }`}
          >
            {isDone ? "Mark as Pending" : "Mark as Complete"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
