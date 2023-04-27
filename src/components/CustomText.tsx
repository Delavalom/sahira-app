import { ReactNode, type FC } from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { colors } from "../styles/globals";

type TextProps = {
  children: ReactNode;
  color: keyof typeof colors;
  fontFamily:
    | "Inter"
    | "Inter-Black"
    | "Inter-ExtraLight"
    | "InterDisplay-ExtraBoldItalic";
  fontSize: number;
  duration: number;
};

export const CustomText: FC<TextProps> = ({
  children,
  color,
  fontFamily,
  fontSize,
  duration,
}) => {
  return (
    <Animated.Text
      entering={FadeInLeft.duration(duration).delay(500)}
      style={{
        fontFamily,
        color,
        fontSize,
      }}
    >
      {children}
    </Animated.Text>
  );
};
