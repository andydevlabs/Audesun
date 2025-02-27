import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import TodayWeather from "./components/TodayWeather";
import { DeviceMotion } from "expo-sensors";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function App() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  useEffect(() => {
    let subscription: ReturnType<typeof DeviceMotion.addListener>;

    const setupDeviceMotion = async () => {
      await DeviceMotion.requestPermissionsAsync();
      subscription = DeviceMotion.addListener(({ rotation }) => {
        if (rotation) {
          const { gamma } = rotation;
          // Convert gamma rotation to degrees
          const degrees = (gamma * 180) / Math.PI;

          // Determine orientation based on device rotation
          if (degrees > 45 && degrees < 135) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
            );
          } else if (degrees < -45 && degrees > -135) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
            );
          } else if (Math.abs(degrees) >= 135) {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_DOWN
            );
          } else {
            ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
          }
        }
      });
    };

    setupDeviceMotion();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <TodayWeather />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lightContainer: {
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#08081a",
  },
});
