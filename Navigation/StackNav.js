import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../Screens/Login'
import Validate from '../Screens/Validate'
import MainScreen from '../Screens/MainScreen'

const StackNav = () => {
    const Stack=createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Validate' component={Validate} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav

const styles = StyleSheet.create({})