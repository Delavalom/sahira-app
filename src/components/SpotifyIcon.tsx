import { type FC } from "react";
import AppLink from "react-native-app-link";
import Svg, { Circle, Path, Rect, SvgProps } from "react-native-svg";

type Props = {
  spotifyTrackID: string;
  appStoreLocation: string;
  size: number;
  stroke: string;
  props?: SvgProps;
};

export const SpotifyIcon: FC<Props> = ({
  spotifyTrackID,
  appStoreLocation,
  size,
  stroke,
  props,
}) => {
  return (
    <Svg
      stroke={stroke}
      onPress={() => {
        AppLink.maybeOpenURL(`spotify://track/${spotifyTrackID}`, {
          appStoreId: 324684580,
          appName: "spotify",
          playStoreId: "com.spotify.music",
          appStoreLocale: appStoreLocation,
        });
      }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M9 18V5l12-2v13" />
      <Circle cx={6} cy={18} r={3} />
      <Circle cx={18} cy={16} r={3} />
    </Svg>
  );
};
