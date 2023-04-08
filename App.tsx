import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "./config/theme";
import { BlurView } from "expo-blur";

export default function App() {
  return (
    <ImageBackground
      blurRadius={10}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        zIndex: 50,
      }}
      source={require("./assets/primaryImage.png")}
    >
      <Image source={require("./assets/icon.png")} style={styles.blurContainer}></Image>
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
    borderRadius: 20,
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
