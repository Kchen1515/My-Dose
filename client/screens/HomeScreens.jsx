import { View, Text, SafeAreaView, TextInput, ScrollView, Image } from 'react-native'
import React, {useLayoutEffect} from 'react'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import {UserIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories.jsx'
import {Provider, Button} from 'react-native-paper';


const HomeScreens = ({navigation}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <Provider>
      <View className="w-full h-full flex justify-center items-center bg-white">
        <View className="w-[210px] h-[210px] flex justify-center items-center rounded-full bg-blue-600">

          <Image source={require('../assets/logo1.png')} className="p-4"
            style={{
              resizeMode: "cover",
              width:300,
              height:300,
            }} />
        </View>
        <Button
          mode="outlined"
          buttonColor="white"
          className="border-blue-500 w-[300px] rounded-md mt-10"
          onPress={() => navigation.navigate("Sign Up")}>
          <Text className="text-blue-600 font-bold ">SIGN UP</Text>
        </Button>
        <Button
          mode="contained"
          className="mt-4 bg-blue-600 w-[300px] rounded-md"
          onPress={() => navigation.navigate("Sign In")}>
         <Text className="text-white font-bold">LOGIN</Text>
        </Button>
      </View>
    </Provider>
  )
}

export default HomeScreens;