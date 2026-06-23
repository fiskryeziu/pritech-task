import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { EmptyState, SearchBar } from "@/components/search-empty";
import { FilterBtn, FilterValue } from "@/components/filter-btn";
import { TaskCard } from "@/components/task-card";
import { useTasks } from "@/store/context";

export default function MyTasksScreen() {
  const router = useRouter();

  const { tasks, loading, toggleTask, deleteTask } = useTasks();

  const [filter, setFilter] = useState<FilterValue>("all");
  const [query, setQuery] = useState("");
  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const filtered = (() => {
    let list = tasks;

    if (filter !== "all") {
      list = list.filter((t) => t.status === filter);
    }

    const q = query.trim().toLowerCase();

    if (q) {
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }

    return list;
  })();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="px-4 pt-2 pb-3">
        <Text className="text-[12px] uppercase tracking-wide text-black">
          {today}
        </Text>

        <Text className="mt-1 text-[28px] font-bold text-black">My Tasks</Text>
      </View>
      <View className="pb-2">
        <SearchBar value={query} onChange={setQuery} />
      </View>
      <FilterBtn value={filter} onChange={setFilter} counts={counts} />
      <View className="h-px bg-border" />
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-[14px] text-black">Loading…</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View className="flex-1">
          {tasks.length === 0 ? (
            <EmptyState
              title="All caught up"
              actionLabel="Add Task"
              onAction={() => router.push("/task/new")}
            />
          ) : (
            <EmptyState title="No matches" />
          )}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
        />
      )}

      <Pressable
        onPress={() => router.push("/task/new")}
        className="absolute bottom-24 right-5 h-14 w-14 items-center justify-center rounded-full bg-black active:opacity-90"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}
