import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

type WeatherData = {
  main: {
    temp: number;
  };
  name: string;
  weather: {
    description: string;
  }[];
};

export default function TodayWeather() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Antananarivo&appid=3cfac0d74f68ebbdd387e5b0f3407622"
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    getWeather();

    const interval = setInterval(getWeather, 120000);
    return () => clearInterval(interval);
  }, []);

  if (!weatherData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const name = weatherData?.name;
  const description = weatherData?.weather[0]?.description;
  const kelvin = weatherData?.main?.temp;
  const celsius = kelvin - 273.15;

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title, themeTextStyle]}>Today</Text>
        <View style={[styles.card, themeContainerStyle]}>
          <View>
            <Text style={[styles.cityName, themeTextStyle]}>{name}</Text>
            <Text
              style={[
                styles.weatherTextDescription,
                styles.weatherTextDescriptionDark,
              ]}
            >
              {description}
            </Text>
          </View>
          <View>
            <Text style={[themeTextStyle]}>{celsius.toFixed(1)}°C</Text>
          </View>
        </View>
      </View>
    </>
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
  weatherTextDescriptionDark: {
    color: "rgba(255, 255, 255, 0.31)",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
    minHeight: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    width: "90%",
    minHeight: "10%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    margin: 5,
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
});
