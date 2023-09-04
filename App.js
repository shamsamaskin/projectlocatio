import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation";
import GooglePlaces from "react-native-google-places";
const App = () => {
  const [nurseries, setNurseries] = useState([]);
  const [sellingPoints, setSellingPoints] = useState([]);
  const [weather, setWeather] = useState({});
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setNurseries(
          getNurseries(position.coords.latitude, position.coords.longitude)
        );
        setSellingPoints(
          getSellingPoints(position.coords.latitude, position.coords.longitude)
        );
        setWeather(getWeather(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }, []);
  const getNurseries = (latitude, longitude) => {
    // Get the list of nurseries near the user's location.
    return GooglePlaces.nearbySearch({
      location: { lat: latitude, lng: longitude },
      type: "nursery",
    });
  };
  const getSellingPoints = (latitude, longitude) => {
    // Get the list of selling points near the user's location.
    return GooglePlaces.nearbySearch({
      location: { lat: latitude, lng: longitude },
      type: "garden center",
    });
  };
  const getWeather = (latitude, longitude) => {
    // Get the weather forecast for the user's location.
    return fetch(
        
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${AIzaSyDLsY4uevVwXjeLzd840AbfsGCN9f6F4-s}`
          )
            .then((response) => response.json())
            .then((json) => {
              setWeather(json);
            })
            .catch((error) => {
              console.error(error);
            });
        };}