import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" overflow-hidden bg-gray-200" mode="margin">
        <Slot />
      </SafeAreaView>
      <StatusBar backgroundColor="#E5E7EB" style="dark" animated={true} />
    </GestureHandlerRootView>
  );
}
