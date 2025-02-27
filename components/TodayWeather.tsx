import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

type WeatherData = {
  main: {
    temp: number;
  };
};

export default function TodayWeather() {
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

  const kelvin = weatherData?.main?.temp;
  const celsius = kelvin - 273.15;

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.temperature}>{celsius.toFixed(1)}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherContainer: {
    width: "90%",
    height: "30%",
    backgroundColor: "rgba(129, 129, 129, 0.11)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  temperature: {
    fontSize: 48,
    color: "rgba(255, 255, 255, 0.9)",
  },
});