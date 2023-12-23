// Import necessary modules and components
import "react-native-gesture-handler";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import About from "../Screens/About";
import MainScreen from "../Screens/MainScreen";
import Privacy from "../Screens/Privacy";
import Contact from "../Screens/Contact";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ShareS from "../Screens/ShareS";
import { CommonActions } from "@react-navigation/native";
import Login from "../Screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a Drawer navigator
const Drawer = createDrawerNavigator();

// Get current date and month for header display
var dates = new Date().getDate();
var month = new Date().getMonth() + 1;
var monthArr = [
  "a",
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];

// Define a reusable DrawerItem component
const DrawerItem = ({ navigation, icon, label, screen, onPressAction }) => (
  <Pressable
    onPress={() => {
      if (onPressAction) {
        onPressAction();
      } else {
        navigation.navigate(screen);
      }
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
      {icon}
      <Text>{label}</Text>
    </View>
  </Pressable>
);

// Define the content of the drawer
const Contentdrawer = (props) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/xCi7RKgfkfTxo1Bs1IaQlk3trvg8HEaG4e-eI6S5hes7KoGt8kNXTyq_oDBEd-Is5B4",
          }}
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginTop: -20,
            marginBottom: 20,
          }}
        >
          Adopt | Plant | Nurture
        </Text>
      </View>

      {/* Drawer items with icons and labels */}
      <DrawerItem
        navigation={navigation}
        icon={
          <Entypo
            name="home"
            size={24}
            style={{ marginRight: 20 }}
            color="black"
          />
        }
        label="Home"
        screen="Home"
      />
      <DrawerItem
        navigation={navigation}
        icon={
          <AntDesign
            name="infocirlce"
            size={24}
            style={{ marginRight: 20 }}
            color="black"
          />
        }
        label="About Tree Mittra"
        screen="About"
      />
      <DrawerItem
        navigation={navigation}
        icon={
          <MaterialCommunityIcons
            name="phone-message"
            size={24}
            style={{ marginRight: 20 }}
            color="black"
          />
        }
        label="Contact Us"
        screen="Contact"
      />
      <DrawerItem
        navigation={navigation}
        icon={
          <MaterialIcons
            name="privacy-tip"
            size={24}
            style={{ marginRight: 20 }}
            color="black"
          />
        }
        label="Privacy Policy"
        screen="Privacy"
      />
      <DrawerItem
        navigation={navigation}
        icon={
          <FontAwesome
            name="share-alt"
            size={24}
            style={{ marginRight: 20 }}
            color="black"
          />
        }
        label="Share Tree Mittra"
        screen="Share"
      />
    </DrawerContentScrollView>
  );
};

// Define header design with app logo
const headerDesign = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/xCi7RKgfkfTxo1Bs1IaQlk3trvg8HEaG4e-eI6S5hes7KoGt8kNXTyq_oDBEd-Is5B4",
        }}
        style={{
          top: -10,
          height: 80,
          width: 90,
        }}
      />
    </View>
  );
};

// Define header design with current date and month
const headerDesign2 = () => {
  return (
    <View style={{ flexDirection: "row", marginRight: 30 }}>
      <Text
        style={{
          color: "black",
          marginRight: 5,
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {dates}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>
        {monthArr[month]}
      </Text>
    </View>
  );
};

// Define the main navigation component using DrawerNavigator
const MainNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <Contentdrawer {...props} />}
    >
      {/* Drawer screens with associated components */}
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerStyle: { height: 80 },
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
      <Drawer.Screen
        name="Share"
        component={ShareS}
        options={{
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Login}
        options={{
          headerTitle: headerDesign,
          headerRight: headerDesign2,
        }}
      />
    </Drawer.Navigator>
  );
};

// Export the MainNav component as the default export
export default MainNav;

// Stylesheet for the component
const styles = StyleSheet.create
