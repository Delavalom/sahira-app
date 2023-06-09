import { ApolloProvider, useQuery } from "@apollo/client";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { AppRegistry, View } from "react-native";
import PagerView from "react-native-pager-view";
import { MainView } from "./src/pages/MainView";
import { PageView } from "./src/pages/PageView";
import { QuerySchemas, client, querys } from "./src/utils/api";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Views />
    </ApolloProvider>
  );
}

function Views() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    Inter: require("./assets/fonts/Inter.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.otf"),
    "InterDisplay-ExtraBoldItalic": require("./assets/fonts/InterDisplay-ExtraBoldItalic.otf"),
  });

  const { data } = useQuery<QuerySchemas["GET_IMAGES"]>(querys.GET_IMAGES, {
    async onCompleted() {
      await SplashScreen.hideAsync();
    },
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && data) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, data]);

  if (!fontsLoaded || !data) {
    return <View />;
  }

  const views = data.pageViewCollection.items
    .filter((item) => item.isMainView === false)
    .map((view, idx) => (
      <PageView
        key={`${idx + 2}`}
        imageUrl={{ uri: view.backgroundImage.url }}
      />
    ));

  const mainUrl =
    data.pageViewCollection.items.find((item) => item.isMainView === true)
      ?.backgroundImage.url ?? "";

  return (
    <PagerView style={{ flex: 1 }} initialPage={0} onLayout={onLayoutRootView}>
      <MainView key="1" imageUrl={{ uri: mainUrl }} />
      {views}
    </PagerView>
  );
}

AppRegistry.registerComponent("mainComponent", () => App);
