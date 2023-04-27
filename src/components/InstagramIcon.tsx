import { type FC } from "react";
import AppLink from "react-native-app-link";
import { Path, Rect, Svg, type SvgProps } from "react-native-svg";

type Props = {
  instagramUsername: string;
  appStoreLocation: string;
  size: number;
  stroke: string;
  props?: SvgProps;
};

export const InstagramIcon: FC<Props> = ({
  instagramUsername,
  appStoreLocation,
  size,
  stroke,
  props,
}) => {
  return (
    <Svg
      stroke={stroke}
      onPress={() => {
        AppLink.maybeOpenURL(
          `instagram://user?username=${instagramUsername}`,
          {
            appStoreId: 389801252,
            appName: "instagram",
            playStoreId: "com.instagram.android",
            appStoreLocale: appStoreLocation ?? "do",
          }
        );
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
      <Rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
      <Path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <Path d="M17.5 6.5L17.51 6.5" />
    </Svg>
  );
};
