import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { Checkbox, StatusBadge } from "./checkbox";
import { Task } from "@/types/type";

function formatDate(iso: string) {
  const date = new Date(iso);

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const router = useRouter();
  const isDone = task.status === "completed";

  return (
    <Pressable
      onPress={() => router.push(`/task/${task.id}`)}
      className="mx-4 mb-2 rounded-2xl border border-border bg-gray-100 active:bg-black/10"
    >
      <View className="flex-row items-start gap-3 p-4">
        <View className="pt-0.5">
          <Checkbox checked={isDone} onPress={onToggle} />
        </View>

        <View className="flex-1">
          <Text
            numberOfLines={1}
            className={`text-[16px] font-semibold ${
              isDone ? "text-black/70 line-through" : "text-black"
            }`}
          >
            {task.title}
          </Text>

          {task.description ? (
            <Text
              numberOfLines={2}
              className={`mt-0.5 text-[13px] leading-5 ${
                isDone ? "text-black/70" : "text-black"
              }`}
            >
              {task.description}
            </Text>
          ) : null}

          <View className="mt-2 flex-row items-center gap-2">
            <StatusBadge status={task.status} />
            <Text className="text-[11px] text-black">
              {formatDate(task.createdAt)}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onDelete}
          hitSlop={10}
          className="h-8 w-8 items-center justify-center rounded-full active:bg-black/20"
        >
          <Text className="text-[18px] text-black">×</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
