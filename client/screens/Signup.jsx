import { View,Text, StyleSheet, ViewStyle, TextStyle, TextInputProps,Pressable, TouchableOpacity,
KeyboardAvoidingView} from 'react-native'
import { useForm, Controller } from "react-hook-form";
import SignupBtn from '../components/SignupBtn.jsx'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import React, {useState,useEffect, useLayoutEffect} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button, IconButton} from 'react-native-paper'


const Signup = ({navigation, props}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password:''
    }
  });

  // const [text, setText] = useState("hest")
  // useEffect(() => {
  //   getUsers()
  // },[])
  // const getUsers = async () => {
  //   const result = await axios.get('http://localhost:3000/users')
  //   console.log(result.data[0].firstName)
  //   setText(result.data[0]._id)
  // }


  const onSubmit = async (data) => {
    const user = await axios.post('http://localhost:3000/signup', data);
    if(user.data.error){
      alert(user.data.error)
     }else{
      await AsyncStorage.setItem('auth-rn', JSON.stringify(data))
      alert("Sign Up Successful")
      navigation.navigate("Initial Details")
     }
  }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View className="flex items-center justify-center border h-full bg-white">
        <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Home")}/>
        <Button></Button>
        <View className="w-full flex items-center justify-center">
          <Text className="text-3xl mb-6 font-extrabold text-blue-600" > SIGN UP</Text>
          <Controller
            control={control}
            rules={{required: true}}
            render={({
              field:{onChange, onBlur, value, name}
            }) => (
              <View className="flex justify-center items-start w-full px-10 mt-5">
                <Text className="text-lg font-medium">First name:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your first name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="words"
                  autoCorrect={false}
                  left={<TextInput.Icon icon="account" />}
                  activeOutlineColor="#1565C0"
                />
              </View>
            )}
            name="firstName"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({
              field:{onChange, onBlur, value, name}
            }) => (
              <View className="flex justify-center items-start w-full px-10 mt-5">
                <Text className="text-lg font-medium">Last Name:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your last name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCorrect={false}
                  left={<TextInput.Icon icon="account" />}
                  activeOutlineColor="#1565C0"
                />
              </View>
            )}
            name="lastName"
          />
          <Controller
            control={control}
            rules={{required: true}}
            render={({
              field:{onChange, onBlur, value, name}
            }) => (
              <View className="flex justify-center items-start w-full px-10 mt-5">
                <Text className="text-lg font-medium">Email:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your email address"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCompleteType="email"
                  keyboardType='email-address'
                  left={<TextInput.Icon icon="email" />}
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
              <View className="flex justify-center items-start w-full px-10 mt-5">
                <Text className="text-lg font-medium">Password:</Text>
                <TextInput className="w-full rounded"
                  mode="outlined"
                  placeholder="Enter your password "
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry={true}
                  autoCompleteType="password"
                  // left={<TextInput.Affix text="/100" textStyle="black" />}
                  left={<TextInput.Icon icon="lock" />}
                  activeOutlineColor="#1565C0"
                />
              </View>
            )}
            name="password"
          />
          <Button
            className=" bg-blue-600 mt-10 p-[3px] w-[350px] rounded" onPress={() => navigation.navigate("Initial Details")}  >
            <Text className="text-white font-bold">REGISTER</Text>
          </Button>
          <View className="mt-4">
            <Text onPress={() => navigation.navigate("Sign In")}>Already Joined? <Text className="text-blue-600 underline">Sign In</Text></Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup;