import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const Contact = () => {
  const HyperlinkText = ({ url, text }) => {
    const handlePress = () => {
      Linking.openURL(url);
    };

    return (
      <Pressable onPress={handlePress}>
        <Text style={{ color: "blue", textDecorationLine: "underline",marginTop:30 }}>
          {text}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "700", color: "gray" }}>
          Contact Tree Mittra
        </Text>
      </View>
      <View style={{ margin: 20, marginTop: 10 }}>
        <Text
          style={{
            textAlign:"center",
            fontSize: 15,
            fontWeight: "400",
            marginTop: 10,
          }}
          numberOfLines={2}
        >
          Email us on{" "}
          <HyperlinkText
            url="https://www.tatapower.com"
            text="tatapower@tatapower.com"
          />{" "}
          so that we can provide you with the support you need
        </Text>
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({});

