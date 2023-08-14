import { View } from "react-native";

export const CardItem = () => {
  return (
    <View className="bg-gray-300 rounded-md my-1">
      <View className="h-44 bg-gray-400 " />
      <View className="p-2 flex-row">
        <View className="w-16 h-16 rounded-full bg-gray-400" />
        <View className="flex-1">
          <View className="ml-2 mt-2 h-6 rounded-xl bg-gray-400" />
          <View className="ml-2 mt-4 w-[50%] h-2 rounded-xl bg-gray-400" />
        </View>
      </View>
    </View>
  );
};
