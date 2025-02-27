import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import TodayWeather from "./components/TodayWeather";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function App() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  useEffect(() => {
    ScreenOrientation.unlockAsync();
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
