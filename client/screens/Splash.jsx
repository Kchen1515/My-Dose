import { View, Text, Image } from 'react-native'
import React,{useLayoutEffect, useEffect, useContext} from 'react'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateContext, Context } from '../context/auth.js'


const Splash = ({navigation}) => {
  const {state, setState} = useContext(Context)

  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  // useEffect(()  => {
  //   setTimeout(() => {
  //     navigation.navigate("Home")
  //   }, 3000);
  // })

  useEffect(() => {
    getFromLocal();
  },[])

  const getFromLocal = async () => {
    let data = await AsyncStorage.getItem("auth-key")
    if(data){
      setState(data)
      setTimeout(() => {
        navigation.navigate("Insulin Calculator")
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.navigate("Home")
      }, 2000);
    }
  }

  return (
// Within your render function

// #35A6BD'
    <View className="h-full flex items-center justify-center bg-[#0b3866]"
    >

     <Image source={require('../assets/logo1.png')} className="p-4"
            style={{
              resizeMode: "cover",
              width:350,
              height:350,
      }} />
    </View>
  )
}

export default Splash