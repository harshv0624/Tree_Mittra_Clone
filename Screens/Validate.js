// Import necessary modules and components
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

// Define the Validate screen component
const Validate = () => {
  // Access route and onVerificationSuccess function from navigation params
  const routes = useRoute();
  const { onVerificationSuccess } = routes.params;

  // State variables for storing actual OTP and user-entered OTP
  const [actualotp, setActualOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");

  // Set actual OTP when component mounts
  useEffect(() => {
    setActualOtp(routes.params.OTP);
  }, []);

  // Function to handle successful verification and token storage
  const temp = (token) => {
    onVerificationSuccess(token);
  };

  // Function to validate user-entered OTP and register the user if valid
  const validateUser = () => {
    const email = routes.params.email;

    // Check if the entered OTP is valid
    if (userOtp.length < 5) {
      Alert.alert("Failed", "Please Enter Valid OTP");
      return;
    } else {
      // If valid OTP, check against the actual OTP
      if (userOtp != actualotp) {
        Alert.alert("Failed", "Please Enter Valid OTP");
      } else {
        // If OTP matches, make a POST request to register the user
        fetch("http://192.168.0.108:3000/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              Alert.alert("Failed", data.error);
            } else {
              // If registration is successful, retrieve the token and call onVerificationSuccess
              const token = data.token;
              temp(token);
              Alert.alert("Success", "Verification Success", [
                {
                  text: "OK",
                },
              ]);
            }
          });
      }
    }
  };

  // Return the UI for the Validate screen
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <View style={{ alignItems: "center", marginTop: "50%" }}>
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/xCi7RKgfkfTxo1Bs1IaQlk3trvg8HEaG4e-eI6S5hes7KoGt8kNXTyq_oDBEd-Is5B4",
          }}
          style={{ height: 250, width: "50%" }}
        />
      </View>
      <View
        style={{ marginHorizontal: 40, marginTop: -15 }}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Enter verification code sent to your email address
        </Text>
        {/* Input field for user to enter OTP */}
        <TextInput
          keyboardType="numbers-and-punctuation"
          returnKeyType="done"
          style={{
            backgroundColor: "#d0d0d0",
            padding: 10,
            width: "80%",
            alignSelf: "center",
            marginTop: 20,
            borderRadius: 15,
            fontSize: 22,
            textAlign: "center",
          }}
          onChangeText={(text) => setUserOtp(text)}
          placeholder="Code"
        />

        {/* Pressable button to trigger OTP validation */}
        <Pressable
          style={{
            backgroundColor: "#33cc00",
            width: "40%",
            alignItems: "center",
            padding: 15,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 25,
          }}
          onPress={() => {
            validateUser();
          }}
        >
          <Text style={{ fontWeight: "700", color: "#fff" }}>Continue</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

// Export the Validate component as the default export
export default Validate;

// Stylesheet for the component
const styles = StyleSheet.create({});
