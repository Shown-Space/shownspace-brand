/**
 * BrandSpinner — React Native / Expo
 * Same mark as web, but RN has no CSS keyframes, so rotation runs on Reanimated.
 *   import { BrandSpinner } from "@shownspace/brand/native";
 *
 * Peer deps in the app: react-native-svg, react-native-reanimated
 */
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { tokens } from "../tokens.js";

const { spinner } = tokens;

export function BrandSpinner({ size = 40 }) {
  const deg = useSharedValue(0);

  useEffect(() => {
    deg.value = withRepeat(
      withTiming(360, { duration: spinner.durationMs, easing: Easing.linear }),
      -1
    );
  }, [deg]);

  const style = useAnimatedStyle(() => ({ transform: [{ rotate: `${deg.value}deg` }] }));

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={[{ width: size, height: size }, style]}
    >
      <Svg viewBox="0 0 100 100" width={size} height={size}>
        <Circle
          cx="50"
          cy="50"
          r={spinner.radius}
          stroke={spinner.track}
          strokeWidth={spinner.strokeWidth}
          fill="none"
        />
        <Circle
          cx="50"
          cy="50"
          r={spinner.radius}
          stroke={spinner.arc}
          strokeWidth={spinner.strokeWidth}
          strokeDasharray={spinner.dashArray}
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
}

export default BrandSpinner;
