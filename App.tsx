import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, type FC, type ReactNode } from "react";
import { AppRegistry, ImageBackground, StyleSheet, View } from "react-native";
import {
  TapGestureHandler,
  PanGestureHandler,
  type GestureEvent,
  type TapGestureHandlerEventPayload,
  type PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SvgInstagram, SvgMusic } from "./src/config/Icons";
import { colors } from "./src/config/theme";
import AppLink from "react-native-app-link";
import PagerView from "react-native-pager-view";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import { CustomText } from "./src/components/CustomText";

const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/ksc9hpf02ja4/environments/master",
  cache: new InMemoryCache(),
  headers: {
    Autorization: `Bearer${"CFPAT-rWenGHbztHiFt4YZ_YN14Oy4jbyaQp9ErVTReomp75g"}`,
  },
});

SplashScreen.preventAutoHideAsync();

type TapHanlder = (event: GestureEvent<TapGestureHandlerEventPayload>) => void;

const GET_IMAGES = gql`
  query pageViewCollectionQuery {
    pageViewCollection {
      items {
        backgroundImage {
          url
        }
        isMainView
      }
    }
  }
`;

type Schema = {
  pageViewCollection: {
    items: {
      backgroundImage: {
        url: string;
      };
      isMainView: boolean;
    }[];
  };
};

const startingPosition = 10;

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Views />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('mainComponent', () => App)

function MainView({ imageUrl }: { imageUrl: string | undefined }) {
  const scale = useSharedValue(1);

  const eventHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.5);
    },
    onActive() {
      scale.value = withSpring(1.5);
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    // TODO: Add an intro opacity animation
    <ImageBackground
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
        <CustomText
          color="white"
          fontFamily="Inter-Black"
          fontSize={70}
          duration={800}
        >
          Hey
        </CustomText>
        <CustomText
          color="white"
          fontFamily="Inter-ExtraLight"
          fontSize={30}
          duration={1000}
        >
          Me llamo,{" "}
        </CustomText>
        <CustomText
          fontFamily="Inter-Black"
          color="white"
          fontSize={50}
          duration={1200}
        >
          Sahira
        </CustomText>
        <CustomText
          fontFamily="Inter"
          color="white"
          fontSize={30}
          duration={1400}
        >
          CEO
          <CustomText
            fontFamily="Inter-ExtraLight"
            color="white"
            fontSize={30}
            duration={1600}
          >
            {" "}
            de
          </CustomText>
        </CustomText>
        <CustomText
          fontFamily="InterDisplay-ExtraBoldItalic"
          color="white"
          fontSize={40}
          duration={1800}
        >
          Alpha
        </CustomText>
        <CustomText
          fontFamily="InterDisplay-ExtraBoldItalic"
          color="white"
          fontSize={40}
          duration={2000}
        >
          Females
        </CustomText>
      </View>
      {/* Have a nav bar with 3 icons, af, insta and spotify link with justin bieber */}
      <Animated.View
        entering={FadeInDown.duration(2200).delay(500)}
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
        <SvgInstagram
          size={40}
          stroke="white"
          onPress={() => {
            AppLink.maybeOpenURL("instagram://user?username=_.sahiramarie", {
              appStoreId: 389801252,
              appName: "instagram",
              playStoreId: "com.instagram.android",
              appStoreLocale: "do",
            });
          }}
        />
        <TapGestureHandler onGestureEvent={eventHandler as TapHanlder}>
          <Animated.Image
            source={require("./assets/alphafemale.png")}
            style={[{ width: 60, height: 60 }, animatedStyle]}
          />
        </TapGestureHandler>
        <SvgMusic
          size={40}
          stroke="white"
          onPress={() => {
            AppLink.maybeOpenURL(
              "spotify://track/4umIPjkehX1r7uhmGvXiSV?si=fb08e8df7a0e4165",
              {
                appStoreId: 324684580,
                appName: "spotify",
                playStoreId: "com.spotify.music",
                appStoreLocale: "do",
              }
            );
          }}
        />
      </Animated.View>
    </ImageBackground>
  );
}

const Views = () => {
  const pressed = useSharedValue(false);
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const { data } = useQuery<Schema>(GET_IMAGES);

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

  console.log(mainView);

  const views = data?.pageViewCollection.items
    .filter((item) => item.isMainView === false)
    .map((view) => view.backgroundImage.url);

  console.log(views);

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
