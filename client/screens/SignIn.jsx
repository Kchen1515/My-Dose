import { View,Text, StyleSheet, ViewStyle, TextStyle, TextInputProps,KeyboardAvoidingView} from 'react-native'
import { useForm, Controller } from "react-hook-form";
import SignupBtn from '../components/SignupBtn.jsx'
import React, {useLayoutEffect} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button, IconButton} from 'react-native-paper'
import {NavigationContainer,useNavigation } from '@react-navigation/native';



const SignIn = ({navigation}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password:''
    }
  });

  const onSubmit = async (data) => {
   const user = await axios.post('http://localhost:3000/signin', data);
   if(user.data.error){
    alert(user.data.error)
   }else{
    await AsyncStorage.setItem('auth-rn', JSON.stringify(data))
    navigation.navigate("Insulin Calculator")
    alert("Sign In Successful")
    console.log(user.data)
   }
  }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View className="flex items-center justify-center border h-full bg-white">
        <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Home")}/>

        <View className="w-full flex items-center justify-center">
        <Text className="text-3xl mb-6 font-extrabold text-blue-600" > SIGN IN</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({
              field:{onChange, onBlur, value, name}
            }) => (
              <View className="flex justify-center items-start w-full px-10">
                <Text className="text-lg font-medium">Email:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCompleteType="email"
                  keyboardType='email-address'
                  left={<TextInput.Icon icon="account"/>}
                  activeOutlineColor="#1565C0"
                />
              </View>
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{required: true}}
            render={({
              field:{onChange, onBlur, value, name}
            }) => (
              <View className="flex justify-center items-start w-full px-10 mt-4">
                <Text className="text-lg font-medium">Password:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={true}
                  autoCompleteType="password"
                  left={<TextInput.Icon icon="lock"/>}
                  activeOutlineColor="#1565C0"
                />
              </View>
            )}
            name="password"
          />
          <Button className="border-blue-600 bg-blue-600 p-[3px] mt-7 w-[350px] rounded hover:bg-white " onPress={() => navigation.navigate("Insulin Calculator")}>
            <Text className="text-white font-bold">LOGIN</Text>
          </Button>
          <View className="mt-6">
            <Text onPress={() => navigation.navigate("Sign Up")}>
              Not yet registered? <Text className="text-blue-600 underline">Sign Up</Text>
            </Text>
          </View>
          {/* <SignupBtn send={handleSubmit(onSubmit)}/> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignIn