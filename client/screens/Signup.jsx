import React, {useState,useEffect, useLayoutEffect, useContext} from 'react'
import { View,Text, TextStyle,KeyboardAvoidingView } from 'react-native'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Libraries & custom hooks
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";
import {TextInput, Button, IconButton} from 'react-native-paper'
import { StateContext, Context } from '../context/auth.js'
import Toast from 'react-native-toast-message';



const Signup = ({navigation, props}) => {

  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  // State Management
  const {state, setState} = useContext(Context)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password:''
    }
  });

  const formComponents = [
    {
      title: "First Name:",
      placeholder: "Enter your first name",
      defaultFormValue: "firstName",
      icon: "account",
      autoCapitalize: "words",
      secureTextEntry: "false"
    },
    {
      title: "Last Name:",
      placeholder: "Enter your last name",
      defaultFormValue: "lastName",
      icon: "account",
      autoCapitalize: "words",
      secureTextEntry: "false"

    },
    {
      title: "Email:",
      placeholder: "Enter your email",
      defaultFormValue: "email",
      icon: "email",
      autoCapitalize: "none",
      secureTextEntry: "false"
    },
    {
      title: "Password:",
      placeholder: "Enter your password",
      defaultFormValue: "password",
      icon: "lock",
      autoCapitalize: "words",
      secureTextEntry: "true"
    },
  ]
  const showToast= (message) => {
    if(message){
      Toast.show({
        type:"error",
        text1: message,
      })
    } else {
      Toast.show({
        type:"success",
        text1: "Successfully Signed Up"
      })
    }
  }
  // Function
  const onSubmit = async (data) => {
    const user = await axios.post('https://e4ef-69-124-242-245.ngrok.io/signup', data);
    if(user.data.error){
      showToast(user.data.error)
     }else{
      setState(user.data)
      await AsyncStorage.setItem('auth-key', JSON.stringify(user.data))
      navigation.navigate("Initial Details")
      showToast();
     }
  }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex items-center justify-center h-full bg-white">
        <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Home")}/>
        <View className="w-full flex items-center justify-center">
          <Text className="text-3xl mb-6 font-extrabold text-[#0b3866]" > SIGN UP</Text>
          {
            formComponents.map((textInput, i) => {
              return (
                <Controller
                  key={i}
                  control={control}
                  rules={{required: true}}
                  render={({
                    field:{onChange, onBlur, value, name}
                  }) => (
                    <View className="flex justify-center items-start w-full px-10 mt-5">
                      <Text className="text-lg font-medium">{textInput.title}</Text>
                      <TextInput className="w-full rounded"
                        mode="outlined"
                        placeholder={textInput.placeholder}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        autoCapitalize={textInput.autoCapitalize}
                        autoCorrect={false}
                        secureTextEntry={textInput.secureTextEntry}
                        left={<TextInput.Icon icon={textInput.icon} />}
                        activeOutlineColor="#1565C0"
                      />
                    </View>
                  )}
                  name={textInput.defaultFormValue}
                />
              )
            })
          }
          <Button
            className=" bg-[#0b3866] mt-10 p-[3px] w-[350px] rounded" onPress={handleSubmit(onSubmit)}  >
            <Text className="text-white text-lg font-bold">REGISTER</Text>
          </Button>
          <View className="mt-4">
            <Text onPress={() => navigation.navigate("Sign In")}>Already Joined? <Text className="text-blue-600 underline">Sign In</Text></Text>
          </View>
        </View>
        <Toast/>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Signup;