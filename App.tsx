import { ApolloProvider, useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { AppRegistry, ImageBackground } from "react-native";
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import PagerView from "react-native-pager-view";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { QuerySchemas, client, querys } from "./src/utils/api";
import { MainView } from "./src/pages/MainView";

SplashScreen.preventAutoHideAsync();

const startingPosition = 10;

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Views />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("mainComponent", () => App);

const Views = () => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const { data } = useQuery<QuerySchemas["GET_IMAGES"]>(querys.GET_IMAGES);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    Inter: require("./assets/fonts/Inter.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.otf"),
    "InterDisplay-ExtraBoldItalic": require("./assets/fonts/InterDisplay-ExtraBoldItalic.otf"),
  });

  const mainView = data?.pageViewCollection.items.find(
    (item) => item.isMainView === true
  );

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

  const views = data?.pageViewCollection.items
    .filter((item) => item.isMainView === false)
    .map((view) => view.backgroundImage.url);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && data) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PagerView style={{ flex: 1 }} initialPage={0} onLayout={onLayoutRootView}>
      <MainView key="1" imageUrl={mainView?.backgroundImage.url} />
      {views &&
        views.map((view, idx) => (
          <ImageBackground
            blurRadius={4}
            key={idx + 2}
            source={require("./assets/page2.jpg")}
            style={{ flex: 1, padding: 40 }}
          >
            <PanGestureHandler onGestureEvent={eventHandler}>
              <Animated.Image
                style={[
                  { width: 300, height: 400, borderRadius: 20 },
                  animatedStyle,
                ]}
                source={require("./assets/page2.jpg")}
              ></Animated.Image>
            </PanGestureHandler>
          </ImageBackground>
        ))}
    </PagerView>
  );
};
