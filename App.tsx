import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient
      style={styles.container}
      colors={["#715df2", "#000000"]}
      start={{ x: 0.25, y: 1.0 }}
      end={{ x: 1.0, y: 0.0 }}
    >
      <View style={styles.blurCard}>
        <Text style={styles.text}>Sahira App</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "#fefefe",
  },
  blurCard: {
    position: "relative",
    height: 250,
    width: 250,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "transparent",
    // shadowOffset: {
    //   height: 5,
    //   width: 5
    // },
    // shadowColor: "white"
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});
