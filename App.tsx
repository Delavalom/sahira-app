import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors } from "./config/theme";
import { SvgAF, SvgInstagram, SvgMusic } from "./config/Icons";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    Inter: require("./assets/fonts/Inter.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.otf"),
    "InterDisplay-ExtraBoldItalic": require("./assets/fonts/InterDisplay-ExtraBoldItalic.otf"),
  });

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
    <ImageBackground
      onLayout={onLayoutRootView}
      blurRadius={4}
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
        <Text
          style={{
            fontFamily: "Inter-Black",
            color: colors.white,
            fontSize: 70,
          }}
        >
          Hey
        </Text>
        <Text
          style={{
            fontFamily: "Inter-ExtraLight",
            color: colors.white,
            fontSize: 30,
          }}
        >
          Me llamo,{" "}
        </Text>
        <Text
          style={{
            fontFamily: "Inter-Black",
            color: colors.white,
            fontSize: 50,
          }}
        >
          Sahira
        </Text>
        <Text
          style={{ fontFamily: "Inter", color: colors.white, fontSize: 30 }}
        >
          CEO
          <Text
            style={{
              fontFamily: "Inter-ExtraLight",
              color: colors.white,
              fontSize: 30,
            }}
          >
            {" "}
            de
          </Text>
        </Text>
        <Text
          style={{
            fontFamily: "InterDisplay-ExtraBoldItalic",
            color: colors.white,
            fontSize: 40,
          }}
        >
          Alpha
        </Text>
        <Text
          style={{
            fontFamily: "InterDisplay-ExtraBoldItalic",
            color: colors.white,
            fontSize: 40,
          }}
        >
          Females
        </Text>
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
        <Image source={require('./assets/alphafemale.png')} style={{width: 60, height: 60}} />
        <SvgMusic size={40} stroke="white" />
      </View>
    </ImageBackground>
  );
}

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
});
