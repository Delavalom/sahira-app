import { FC } from "react";
import { ImageBackground } from "react-native";
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const startingPosition = 10;

export const PageView: FC<{ imageUrl: { uri: string } }> = ({ imageUrl }) => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const eventHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart(event, ctx) {
      pressed.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive(event, ctx) {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd() {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <ImageBackground
      blurRadius={4}
      source={imageUrl}
      style={{ flex: 1, padding: 40 }}
    >
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.Image
          style={[{ width: 300, height: 400, borderRadius: 20 }, animatedStyle]}
          source={imageUrl}
        ></Animated.Image>
      </PanGestureHandler>
    </ImageBackground>
  );
};
