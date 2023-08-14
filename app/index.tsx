import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CardItem, ScrollHeader } from "./(components)";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function HomeScreen() {
  let data: undefined[] = [];
  data.length = 50;
  data = Array.from([...data]);
  const headerPosition = useSharedValue(0);
  const previousPosition = useSharedValue(0);
  const hiddenHeaderHeight = useSharedValue(0);

  // clamp function copied from https://stackoverflow.com/questions/68380161/how-to-use-diffclamp-in-reanimated-2
  const clamp = (value: number, lowerBound: number, upperBound: number) => {
    "worklet";
    return Math.min(Math.max(lowerBound, value), upperBound);
  };

  const getStickyItemHeight = (height: number) => {
    hiddenHeaderHeight.value = height;
  };

  const onScroll = useAnimatedScrollHandler(({ contentOffset }) => {
    const isScrollingUp = previousPosition.value < contentOffset.y;
    const top =
      headerPosition.value - (previousPosition.value - contentOffset.y);

    if (isScrollingUp && headerPosition.value < hiddenHeaderHeight.value) {
      headerPosition.value = clamp(contentOffset.y, headerPosition.value, top);
    } else if (!isScrollingUp && headerPosition.value > 0) {
      headerPosition.value = clamp(top, 0, headerPosition.value);
    }
    previousPosition.value = contentOffset.y;
  });

  return (
    <View className="h-full">
      <ScrollHeader
        headerPosition={headerPosition}
        getStickyItemHeight={getStickyItemHeight}
      />
      <AnimatedFlashList
        ListHeaderComponent={
          <Animated.View
            style={{
              height: hiddenHeaderHeight,
            }}
          />
        }
        onScroll={onScroll}
        data={data}
        estimatedItemSize={255.9}
        renderItem={() => <CardItem />}
        keyExtractor={(_, index) => index.toString(32)}
      />
    </View>
  );
}
