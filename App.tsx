import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        Sahira App dfsadfsdfasfasfdas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
});
