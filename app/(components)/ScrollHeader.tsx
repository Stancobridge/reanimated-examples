import { View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export const ScrollHeader = ({
  headerPosition,
  getStickyItemHeight,
}: {
  headerPosition: SharedValue<number>;
  getStickyItemHeight: (height: number) => void;
}) => {
  let tabTitles: undefined[] = [];
  tabTitles.length = 10;
  tabTitles = Array.from([...tabTitles]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: -headerPosition.value,
      },
    ],
  }));

  return (
    <Animated.View
      onLayout={({ nativeEvent }) => {
        getStickyItemHeight(nativeEvent.layout.height);
      }}
      className="z-50 absolute"
      style={animatedStyle}
    >
      <View className="bg-gray-200 p-2 justify-between flex-row">
        <View className="w-[25%] rounded-lg bg-gray-400 h-8" />
        <View className="w-[45%] rounded-lg bg-gray-300" />
      </View>
      <Animated.ScrollView
        className="bg-gray-200 p-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tabTitles.map((_, index) => (
          <View
            key={(index * Math.random()).toString()}
            className="bg-gray-300 h-4 w-16 rounded-md mr-4"
          />
        ))}
      </Animated.ScrollView>
    </Animated.View>
  );
};
