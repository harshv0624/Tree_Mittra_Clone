import { StyleSheet, Text, View,Share } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShareS = () => {

    useEffect(()=>{
        const handleShare = async () => {
          AsyncStorage.setItem('token','')
            try {
              const result = await Share.share({
                message: 'Check out this awesome app: https://www.example.com',
              });
        
              if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
              } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
              }
            } catch (error) {
              console.error('Error sharing:', error.message);
            }
          };

          handleShare()
    },[])
  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
    </View>
  )
}

export default ShareS

const styles = StyleSheet.create({})