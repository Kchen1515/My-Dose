import { View, Text, SafeAreaView, TextInput, ScrollView, Image } from 'react-native'
import React, {useLayoutEffect, useEffect} from 'react'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {Provider, Button} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';



const HomeScreens = ({navigation}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <Provider>
      <View className="w-full h-full flex justify-center items-center bg-white"
      >
        <LinearGradient
          className="w-[210px] h-[210px] flex justify-center items-center rounded-full "
          colors={['#357BBD', '#0b3866']}
        >

          <Image source={require('../assets/logo1.png')} className="p-4"
            style={{
              resizeMode: "cover",
              width:300,
              height:300,
            }} />
        </LinearGradient>
        <Button
          mode="outlined"
          buttonColor="white"
          className="border-[#0b3866] border-2 w-[300px] rounded-md mt-10  pt-1"
          onPress={() => navigation.navigate("Sign Up")}>
          <Text className="text-[#0b3866] text-lg font-bold ">SIGN UP</Text>
        </Button>
        <Button
          mode="contained"
          className="mt-4 bg-[#0b3866] pt-1 w-[300px] rounded-md"
          onPress={() => navigation.navigate("Sign In")}>
         <Text className="text-white text-lg font-bold">LOGIN</Text>
        </Button>
      </View>
    </Provider>
  )
}

export default HomeScreens;