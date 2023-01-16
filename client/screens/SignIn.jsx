import { View,Text, StyleSheet, ViewStyle, TextStyle, TextInputProps,KeyboardAvoidingView} from 'react-native'
import { useForm, Controller } from "react-hook-form";
import React, {useLayoutEffect, useContext} from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button, IconButton} from 'react-native-paper'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import { StateContext, Context } from '../context/auth.js'



const SignIn = ({navigation}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  const {state, setState} = useContext(Context)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password:''
    }
  });
  const formComponents = [
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
  const onSubmit = async (data) => {
   const user = await axios.post('http://localhost:3000/signin', data);
   if(user.data.error){
    alert(user.data.error)
   } else {
    setState(user.data)
    await AsyncStorage.setItem('auth-key', JSON.stringify(user.data))
    navigation.navigate('Insulin Calculator')
    alert('Signed in Successfully')
   }
  }

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View className="flex items-center justify-center border h-full bg-white">
        <IconButton
          icon="arrow-left"
          iconColor="#357BBD"
          className="absolute left-0 top-[50px]"
          size={35}
          onPress={() => navigation.navigate("Home")}/>
        <View className="w-full flex items-center justify-center">
          <Text className="text-3xl mb-6 font-extrabold text-[#0b3866]" > SIGN IN</Text>
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
            className="border-blue-600 bg-[#0b3866] p-[3px] mt-7 w-[350px] rounded hover:bg-white "
            onPress={handleSubmit(onSubmit)}>
            <Text className="text-white text-lg font-bold">LOGIN</Text>
          </Button>
          <View className="mt-6">
            <Text
              onPress={() => navigation.navigate("Sign Up")}
            >
              Not yet registered?
              <Text className="text-[#357BBD] underline"> Sign Up</Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignIn;