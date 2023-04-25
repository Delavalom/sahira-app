import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, type FC, type ReactNode } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View
} from "react-native";
import Animated, {
  LightSpeedInLeft, useAnimatedStyle, useSharedValue,
} from "react-native-reanimated";
import { SvgInstagram, SvgMusic } from "./config/Icons";
import { colors } from "./config/theme";

SplashScreen.preventAutoHideAsync();

const AnimateImageBackground = Animated.createAnimatedComponent(ImageBackground)

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    Inter: require("./assets/fonts/Inter.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.otf"),
    "InterDisplay-ExtraBoldItalic": require("./assets/fonts/InterDisplay-ExtraBoldItalic.otf"),
  });
  const pressed = useSharedValue(false)
  const pressedAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(pressed.value ? 1.2 : 1) }],
    }
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // TODO: Add an intro opacity animation
    <AnimateImageBackground
      blurRadius={40}
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        position: "relative",
        overflow: "hidden",
        zIndex: 50,
      }}
      source={require("./assets/background.png")}
    >
      {/* TODO: add text animations */}
      {/* Intro text flex box so they can stay at the left side of the screen */}
      <View style={{ flex: 1 }}>
        <CustomText color="white" fontFamily="Inter-Black" fontSize={70}>
          Hey
        </CustomText>
        <CustomText color="white" fontFamily="Inter-ExtraLight" fontSize={30}>
          Me llamo,{" "}
        </CustomText>
        <Animated.Text
          style={{
            fontFamily: "Inter-Black",
            color: colors.white,
            fontSize: 50,
          }}
        >
          Sahira
        </Animated.Text>
        <Animated.Text
          style={{ fontFamily: "Inter", color: colors.white, fontSize: 30 }}
        >
          CEO
          <CustomText fontFamily="Inter-ExtraLight" color="white" fontSize={30}>
            {" "}
            de
          </CustomText>
        </Animated.Text>
        <CustomText fontFamily="InterDisplay-ExtraBoldItalic" color="white" fontSize={40}>Alpha</CustomText>
        <CustomText fontFamily="InterDisplay-ExtraBoldItalic" color="white" fontSize={40}>Females</CustomText>
      </View>
      {/* Have a nav bar with 3 icons, af, insta and spotify link with justin bieber */}
      <View
        style={{
          width: "80%",
          height: 80,
          borderRadius: 40,
          marginBottom: 40,
          alignSelf: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SvgInstagram size={40} stroke="white" />
        <Image
          source={require("./assets/alphafemale.png")}
          style={{ width: 60, height: 60 }}
        />
        <SvgMusic size={40} stroke="white" />
      </View>

    </AnimateImageBackground>
  );
}

type TextProps = {
  children: ReactNode;
  color: keyof typeof colors;
  fontFamily:
    | "Inter"
    | "Inter-Black"
    | "Inter-ExtraLight"
    | "InterDisplay-ExtraBoldItalic";
  fontSize: number;
};

const CustomText: FC<TextProps> = ({
  children,
  color,
  fontFamily,
  fontSize,
}) => {
  return (
    <Animated.Text
    entering={LightSpeedInLeft}
      style={{
        fontFamily,
        color,
        fontSize,
      }}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: colors.white,
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 120,
    height: 500,
    width: 350,
    borderRadius: 500,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  box: {
    width: 50,
    height: 40,
    backgroundColor: "black",
    margin: 30,
  },
});
