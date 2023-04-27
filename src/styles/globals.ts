import { StyleSheet } from "react-native";

export const colors = {
  black: "#000000",
  white: "#fefefe",
  purple: "#715df2"
}

export const styles = StyleSheet.create({
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
  