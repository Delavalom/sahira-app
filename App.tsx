import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors } from "./config/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    Inter: require("./assets/fonts/Inter.ttf"),
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
        paddingVertical: 100,
        paddingHorizontal: 20,
        position: "relative",
        overflow: "hidden",
        zIndex: 50,
      }}
      source={require("./assets/background.png")}
    >
      {/* TODO: add text animations */}
      {/* Intro text flex box so they can stay at the left side of the screen */}
      <View>
        <Text
          style={{ fontFamily: "Inter-Black", color: colors.white, fontSize: 50 }}
        >
          Hey
        </Text>
        <Text style={{ fontFamily: "Inter", color: colors.white, fontSize: 50 }}>
          Me llamo,{" "}
          <Text
            style={{
              fontFamily: "Inter-Black",
              color: colors.white,
              fontSize: 50,
            }}
          >
            Sahira
          </Text>
        </Text>
        <Text style={{ fontFamily: "Inter", color: colors.white, fontSize: 50 }}>
          CEO the Alpha Females
        </Text>
      </View>
      {/* Have a nav bar with 3 icons, af, insta and spotify link with justin bieber */}
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
