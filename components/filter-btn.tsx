import { Pressable, ScrollView, Text, View } from "react-native";

type FilterBtnProps = {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: Record<FilterValue, number>;
};

export type FilterValue = "all" | "pending" | "completed";

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

export function FilterBtn({ value, onChange, counts }: FilterBtnProps) {
  return (
    <View className="h-14 justify-center">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          alignItems: "center",
        }}
      >
        {FILTERS.map((filter) => {
          const selected = filter.value === value;

          return (
            <Pressable
              key={filter.value}
              onPress={() => onChange(filter.value)}
              style={{
                flexShrink: 0,
                height: 36,
              }}
              className={`flex-row items-center rounded-full border px-3.5 ${
                selected ? "border-black bg-black" : "border-border bg-inherit"
              }`}
            >
              <Text
                className={`text-[13px] font-medium ${
                  selected ? "text-white" : "text-black"
                }`}
              >
                {filter.label}
              </Text>

              <View className="ml-2 min-w-[20px] items-center  px-1.5 py-0.5">
                <Text
                  className={`text-[11px] font-semibold  ${
                    selected ? "text-white" : "text-black"
                  }`}
                >
                  {counts[filter.value]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
