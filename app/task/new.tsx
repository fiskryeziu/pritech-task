import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTasks } from "@/store/context";

const MAX_TITLE = 80;
const MAX_DESC = 500;

type FormErrors = {
  title?: string;
  description?: string;
};

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: FormErrors = {};

    const t = title.trim();
    const d = description.trim();

    if (t.length === 0) {
      next.title = "Title is required.";
    } else if (t.length < 3) {
      next.title = "Title must be at least 3 characters.";
    } else if (t.length > MAX_TITLE) {
      next.title = `Title must be ${MAX_TITLE} characters or fewer.`;
    }

    if (d.length > MAX_DESC) {
      next.description = `Description must be ${MAX_DESC} characters or fewer.`;
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSubmitting(true);

    try {
      await addTask({
        title,
        description,
      });

      router.back();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1">
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()} hitSlop={10}>
          <Text className="text-[15px] text-black">Cancel</Text>
        </Pressable>

        <Text className="text-xl font-semibold text-black/70">New Task</Text>

        <View style={{ width: 50 }} />
      </View>

      <View className="h-px bg-border" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 32,
            }}
          >
            <Text className="mb-1.5 text-[12px] font-semibold uppercase tracking-wide text-black">
              Title
            </Text>

            <TextInput
              value={title}
              onChangeText={(value) => {
                setTitle(value);

                if (errors.title) {
                  setErrors((prev) => ({
                    ...prev,
                    title: undefined,
                  }));
                }
              }}
              placeholder="e.g. Plan team offsite"
              placeholderTextColor="#8E8E93"
              maxLength={MAX_TITLE + 1}
              className={`rounded-2xl border px-4 py-3.5 text-[16px]  ${
                errors.title ? "border-danger " : "border-border"
              }`}
            />

            {errors.title ? (
              <Text className="mt-1.5 text-[12px] text-danger">
                {errors.title}
              </Text>
            ) : (
              <Text className="mt-1.5 text-right text-[11px] text-black/50">
                {title.length}/{MAX_TITLE}
              </Text>
            )}

            <Text className="mb-1.5 mt-5 text-[12px] font-semibold uppercase tracking-wide text-black">
              Description
            </Text>

            <TextInput
              value={description}
              onChangeText={(value) => {
                setDescription(value);

                if (errors.description) {
                  setErrors((prev) => ({
                    ...prev,
                    description: undefined,
                  }));
                }
              }}
              placeholder="Optional details about this task…"
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={MAX_DESC + 1}
              style={{ minHeight: 120 }}
              className={`rounded-2xl border px-4 py-3.5 text-[15px]  ${
                errors.description ? "border-danger" : "border-border"
              }`}
            />

            {errors.description ? (
              <Text className="mt-1.5 text-[12px] text-danger">
                {errors.description}
              </Text>
            ) : (
              <Text className="mt-1.5 text-right text-[11px] text-black/50">
                {description.length}/{MAX_DESC}
              </Text>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>

        <View className="border-t border-border  px-4 py-3">
          <Pressable
            onPress={handleSave}
            disabled={submitting}
            className={`items-center rounded-full py-3.5 ${
              submitting ? "bg-black" : "bg-black/90 active:opacity-90"
            }`}
          >
            <Text className="text-[15px] font-semibold text-white">
              {submitting ? "Saving…" : "Save Task"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
