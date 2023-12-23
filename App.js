// Import necessary modules and components
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNav from "./Navigation/StackNav";
import MainNav from "./Navigation/MainNav";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import MainScreen from "./Screens/MainScreen";
import Validate from "./Screens/Validate";
import ShareS from "./Screens/ShareS";

// Define the main App functional component
export default function App() {
  // Set up AsyncStorage value for initial verification
  // AsyncStorage.setItem('Value',0)

  // State variable to track verification status
  const [isverified, setIsverified] = useState(false);

  // Function to handle verification success and store the token in AsyncStorage
  const onVerificationSuccess = async (token) => {
    await AsyncStorage.setItem("token", token);
    setIsverified(true);
  };

  // useEffect to check if a verification token exists in AsyncStorage on app start
  useEffect(() => {
    const checkToken = async () => {
      // Retrieve the verification token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      console.log(token);

      // Update the verification status based on the presence of the token
      setIsverified(!!token);
    };
    checkToken();
  }, []);

  // Create a Native Stack Navigator
  const StackNavigator = createNativeStackNavigator();

  // Define the Stack component containing authentication screens
  const Stack = () => {
    return (
      <StackNavigator.Navigator>
        <StackNavigator.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <StackNavigator.Screen
          name="Validate"
          component={Validate}
          options={{ headerShown: false }}
          initialParams={{ onVerificationSuccess }}
        />
        <StackNavigator.Screen
          name="Share"
          component={ShareS}
          options={{ headerShown: false }}
          initialParams={{ onVerificationSuccess }}
        />
      </StackNavigator.Navigator>
    );
  };

  // Return the NavigationContainer with either the authenticated MainNav or the authentication Stack
  return (
    <NavigationContainer>
      {isverified ? <MainNav /> : <Stack />}
    </NavigationContainer>
  );
}
