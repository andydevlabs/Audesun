import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodayWeather from './components/TodayWeather';

export default function App() {



  return (
    <View style={styles.container}>
      <TodayWeather />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08081a",
    alignItems: "center",
    justifyContent: "center",
  },
});
