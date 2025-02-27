import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ScrollView,
} from "react-native";

type WeatherData = {
  main: {
    temp: number;
  };
  name: string;
  weather: {
    description: string;
  }[];
};

const CITIES = ["Antananarivo", "Paris", "Tokyo", "London", "New York"];
const API_KEY = "3cfac0d74f68ebbdd387e5b0f3407622";

export default function TodayWeather() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const weatherTextDescriptionStyle =
    colorScheme === "light"
      ? styles.weatherTextDescriptionLight
      : styles.weatherTextDescriptionDark;

  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);

  useEffect(() => {
    async function getWeatherForCity(city: string) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        return response.json();
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
        return null;
      }
    }

    async function getAllWeather() {
      const promises = CITIES.map((city) => getWeatherForCity(city));
      const results = await Promise.all(promises);
      setWeatherDataList(results.filter((data) => data !== null));
    }

    getAllWeather();
    const interval = setInterval(getAllWeather, 120000);
    return () => clearInterval(interval);
  }, []);

  if (!weatherDataList.length) {
    return (
      <View>
        <Text style={themeTextStyle}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, themeTextStyle]}>Today</Text>
      <ScrollView style={styles.scrollView}>
        {weatherDataList.map((weatherData, index) => {
          const celsius = weatherData.main.temp - 273.15;
          return (
            <View key={index} style={[styles.card, themeContainerStyle]}>
              <View>
                <Text style={[styles.cityName, themeTextStyle]}>
                  {weatherData.name}
                </Text>
                <Text
                  style={[
                    styles.weatherTextDescription,
                    weatherTextDescriptionStyle,
                  ]}
                >
                  {weatherData.weather[0].description}
                </Text>
              </View>
              <View>
                <Text style={[themeTextStyle]}>{celsius.toFixed(1)}°C</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    width: "80%",
    textAlign: "left",
    marginBottom: 5,
  },
  cityName: {
    fontSize: 20,
  },
  weatherTextDescription: {
    marginTop: 5,
    fontSize: 12,
  },
  weatherTextDescriptionLight: {
    color: "rgba(0, 0, 0, 0.31)",
  },
  weatherTextDescriptionDark: {
    color: "rgba(255, 255, 255, 0.31)",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "100%",
    minHeight: "10%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 5,
  },
  darkContainer: {
    backgroundColor: "rgba(129, 129, 129, 0.11)",
  },
  lightContainer: {
    backgroundColor: "rgb(233, 233, 233)",
  },
  darkThemeText: {
    color: "rgba(255, 255, 255, 0.9)",
  },
  lightThemeText: {
    color: "rgba(0, 0, 0, 0.9)",
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: "5%",
  },
});
