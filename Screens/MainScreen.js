// Import necessary components and libraries from React Native
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the MainScreen functional component
const MainScreen = () => {
  // State variables to store image data and ID
  const [imageData, setImageData] = useState(null);
  const [id, setId] = useState("");

  // useEffect hook to fetch and display images based on certain conditions
  useEffect(() => {
    const fetchImage = async () => {
      // Get the current date and day
      const currentDate = new Date();
      const currentDay = currentDate.getDay();

      // Log current day for debugging purposes
      console.log(currentDay);

      // Retrieve the stored day from AsyncStorage
      const storedDayString = await AsyncStorage.getItem("currentDay");
      const storedDay = storedDayString ? parseInt(storedDayString, 10) : null;

      // Log current and stored day for debugging purposes
      console.log("First:", currentDay, storedDay);

      try {
        // Check conditions to determine which image to fetch and display
        if (currentDay === 1 && (!storedDay || storedDay !== currentDay)) {
          // Fetch a new image and update AsyncStorage with relevant data
          const response = await fetch("http://192.168.0.108:3000/GetImg", {
            method: "GET",
          });
          const arrayBuffer = await response.json();
          const temp = Buffer.from(arrayBuffer.data).toString("base64");
          console.log("second", arrayBuffer.id);
          setImageData(temp);
          console.log("this", arrayBuffer.id);
          setId(arrayBuffer.id);
          await AsyncStorage.setItem("currentDay", currentDay.toString());
          await AsyncStorage.setItem("id", arrayBuffer.id.toString());
          await AsyncStorage.setItem("Stateid", arrayBuffer.id.toString());
        } else if (storedDay && storedDay === currentDay) {
          // Fetch a stored image based on the stored ID
          const storedValueString = await AsyncStorage.getItem("id");
          const storedValue = storedValueString;
          console.log("Third", storedValue);
          console.log("Fourth", id);
          const response = await fetch(
            `http://192.168.0.108:3000/GetNewImg?id=${storedValue}`,
            {
              method: "GET",
            }
          );
          const arrayBuffer = await response.json();
          const temp = Buffer.from(arrayBuffer.data).toString("base64");
          setImageData(temp);
          await AsyncStorage.setItem("currentDay", currentDay.toString());
          await AsyncStorage.setItem("id", arrayBuffer.id.toString());
          await AsyncStorage.setItem("Stateid", arrayBuffer.id.toString());
          console.log("Done");
        } else {
          // Fetch the image based on the stored ID or fetch a new image
          const storedId = await AsyncStorage.getItem("id");
          console.log("ID", storedId);
          let arrayBuffer = "";
          if (storedId) {
            const response = await fetch(
              `http://192.168.0.108:3000/GetNewImg?id=${storedId}`,
              {
                method: "GET",
              }
            );

            arrayBuffer = await response.json();
            const temp = Buffer.from(arrayBuffer.data).toString("base64");
            console.log(arrayBuffer.id);
            setImageData(temp);
            console.log("if block");
          } else {
            const response = await fetch("http://192.168.0.108:3000/GetImg", {
              method: "GET",
            });

            arrayBuffer = await response.json();
            const temp = Buffer.from(arrayBuffer.data).toString("base64");
            console.log(arrayBuffer.id);
            setImageData(temp);
            console.log("else block");
          }
          setId(arrayBuffer.id);
          await AsyncStorage.setItem("currentDay", currentDay.toString());
          await AsyncStorage.setItem("id", arrayBuffer.id.toString());
          await AsyncStorage.setItem("Stateid", arrayBuffer.id.toString());
          console.log("Last Block");
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Call the fetchImage function when the component mounts
    fetchImage();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Render the main component
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Display the background image */}
      <ImageBackground
        source={{ uri: `data:;base64,${imageData}` }}
        style={{ width: "100%", height: "100%", marginTop: 15 }}
        resizeMode="cover"
      >
        {/* Overlay view for text content */}
        <View
          style={{
            height: "80%",
            width: "100%",
            opacity: 0.1,
            backgroundColor: "#fff",
          }}
        ></View>

        {/* Content view with text information */}
        <View
          style={{
            backgroundColor: "black",
            opacity: 0.6,
            height: 180,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "800", fontSize: 20, textAlign: 'center' }}>
            Modern School Campus, Delhi
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              margin: 10,
              textAlign: 'center'
            }}
          >
            This tree was planted by xyz foundation on the occasion of Independence Day
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

// Export the MainScreen component as the default export
export default MainScreen;

// Stylesheet for the component
const styles = StyleSheet.create({});
