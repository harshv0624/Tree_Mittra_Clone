import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Linking } from "react-native";
import { StatusBar } from "expo-status-bar";

const About = () => {
  useEffect(() => {
    console.log("hi");
  });

  const HyperlinkText = ({ url, text }) => {
    const handlePress = () => {
      Linking.openURL(url);
    };

    return (
      <Pressable onPress={handlePress}>
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          {text}
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 15 }}>
        <Text style={{ fontSize: 25, fontWeight: "700", color: "gray" }}>
          About Tree Mittra
        </Text>
      </View>
      <View style={{ margin: 20 }}>
        <Text
          style={{
            textAlign: "justify",
            fontSize: 17,
            fontWeight: "400",
            marginTop: 10,
          }}
        >
          Tree Mittra, an unique flagship volunteering initiative, is a virtual
          plantation drive by Tata Power under the Green theme which aims at
          encouraging employees and their families to adopt a tree, plant and
          nurture its survival.
        </Text>
        <Text
          style={{
            textAlign: "justify",
            fontSize: 17,
            fontWeight: "400",
            marginTop: 10,
          }}
        >
          The time has come now to give back to our planet all that we have
          devoured to ensure that our future generations continue to live and
          thrive in this beautiful planet as healthy individuals in complete
          harmony with nature and wild life. TATA Power
        </Text>
        <Text
          style={{
            textAlign: "justify",
            fontSize: 17,
            fontWeight: "400",
            marginTop: 10,
          }}
        >
          is conducting a nationwide virtual tree plantation drive involving all
          our customers, employees and their families as well as our
          stakeholders under our thematic initiative Tree Mittra. A unique
          approach under our Green Community.
        </Text>
        <Text style={{ fontSize: 17, fontWeight: "400", marginTop: 10 }}>
          To know more, click on
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
            color: "blue",
            textDecorationLine: "underline",
            marginTop: 5,
          }}
        >
          <HyperlinkText
            url="https://www.tatapower.com"
            text="https://www.tatapower.com/green-community/tree-Mittra"
          />
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({});
