import { ImageBackground, View } from "react-native";
import {
  TapGestureHandler,
  type GestureEvent,
  type TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CustomText } from "../components/CustomText";
import { InstagramIcon } from "../components/InstagramIcon";
import { SpotifyIcon } from "../components/SpotifyIcon";

type TapHanlder = (event: GestureEvent<TapGestureHandlerEventPayload>) => void;

export function MainView({ imageUrl }: { imageUrl: { uri: string } }) {
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
      source={imageUrl}
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
        <InstagramIcon
          size={40}
          stroke="white"
          instagramUsername="_.sahiramarie"
          appStoreLocation="do"
        />
        <TapGestureHandler onGestureEvent={eventHandler as TapHanlder}>
          <Animated.Image
            source={require("../../assets/alphafemale.png")}
            style={[{ width: 60, height: 60 }, animatedStyle]}
          />
        </TapGestureHandler>
        <SpotifyIcon
          size={40}
          stroke="white"
          spotifyTrackID="4umIPjkehX1r7uhmGvXiSV?si=fb08e8df7a0e4165"
          appStoreLocation="do"
        />
      </Animated.View>
    </ImageBackground>
  );
}
