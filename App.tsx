import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, useColorScheme } from "react-native";
import TodayWeather from "./components/TodayWeather";

export default function App() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

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
