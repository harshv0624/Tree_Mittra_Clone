// Import necessary modules and components
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Define the Login screen component
const Login = () => {
  // Access navigation instance
  const navigation = useNavigation();

  // State variables for email input, loading state, and modal visibility
  const [num, setNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to check the entered email and initiate OTP sending
  const checkNumber = async () => {
    try {
      // Set loading state to true
      setLoading(true);

      // Make a POST request to the server to send OTP
      const response = await fetch("http://192.168.0.108:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num }),
      });

      // Parse the response data
      const data = await response.json();

      // Check for errors in the response
      if (data.error) {
        // Display an alert for failed operation
        Alert.alert("Failed", data.error);
      } else {
        // Display success alert and navigate to Validate screen
        Alert.alert("Success", "OTP Sent to Email Address", [
          {
            text: "Ok",
            onPress: () => {
              navigation.navigate("Validate", {
                OTP: data.data,
                email: num,
              });
            },
          },
        ]);
      }
    } catch (error) {
      // Log any errors during the process
      console.log("error:", error);
    } finally {
      // Set loading state to false after the operation is completed
      setLoading(false);
    }
  };

  // Return the UI for the Login screen
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ alignItems: "center" }}>
        {/* Application Logo */}
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/xCi7RKgfkfTxo1Bs1IaQlk3trvg8HEaG4e-eI6S5hes7KoGt8kNXTyq_oDBEd-Is5B4",
          }}
          style={{ height: 300, width: "70%" }}
        />
        {/* Information Text */}
        <View style={{ alignSelf: "center" }}>
          <Text
            style={{ marginHorizontal: 20, textAlign: "center", fontSize: 16 }}
          >
            Please enter your email address to receive a verification code
          </Text>
        </View>
        {/* Email Input */}
        <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 15 }}>
          <TextInput
            style={{ fontSize: 22, width: "100%", textAlign: "center" }}
            keyboardType="default"
            autoComplete="email"
            placeholder="Email"
            onChangeText={(text) => setNum(text)}
            value={num}
          />
        </View>
        {/* Continue Button */}
        <Pressable
          style={{
            backgroundColor: "#33cc00",
            width: "50%",
            alignItems: "center",
            padding: 10,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 30,
          }}
          onPress={() => {
            setModalVisible(true); // Show the loading modal
            checkNumber();
          }}
        >
          <Text style={{ fontWeight: "700", color: "#fff" }}>Continue</Text>
        </Pressable>

        {/* Loading Modal */}
        {loading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <ActivityIndicator size="large" color="#33cc00" />
              <Text style={{ marginTop: 10 }}>Please Wait...</Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Export the Login component as the default export
export default Login;
