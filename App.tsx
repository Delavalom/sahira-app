import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  type NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

type RootParamList = {
  Screen1: undefined;
  Screen2: { paramA: string };
  Screen3: { paramB: string; paramC: number };
};

const Root = createNativeStackNavigator<RootParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Screen1" component={Screen1} />
        <Root.Screen name="Screen2" component={Screen2} />
        <Root.Screen name="Screen3" component={Screen3} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

type Screen1Props = NativeStackScreenProps<RootParamList, "Screen1">;

export const Screen1: FC<Screen1Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hello from the screen 1</Text>
      <Button onPress={() => navigation.navigate("Screen1")} title="Press me" />
    </View>
  );
};
type Screen2Props = NativeStackScreenProps<RootParamList, "Screen2">;

export const Screen2: FC<Screen2Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hello from the screen 2</Text>
      <Button onPress={() => navigation.push("Screen2", {paramA: "2222"})} title="Press me" />
    </View>
  );
};
type Screen3Props = NativeStackScreenProps<RootParamList, "Screen3">;

export const Screen3: FC<Screen3Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hello from the screen 3</Text>
      <Button onPress={() => navigation.push("Screen3", {paramB: "3333", paramC: 3333232})} title="Press me" />
    </View>
  );
};
