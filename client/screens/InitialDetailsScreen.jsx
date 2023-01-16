import { View, Text, StyleSheet, ViewStyle, TextStyle, TextInputProps,Pressable, TouchableOpacity,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, {useLayoutEffect, useEffect, useState, useContext} from 'react'
import { useForm, Controller } from "react-hook-form";
import {TextInput, Button, IconButton} from 'react-native-paper'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateContext, Context } from '../context/auth.js'




const InitialDetailsScreen = ({navigation}) => {
  const [userId, setUserId] = useState('')
  const {state, setState} = useContext(Context)


  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      carbRatio: '',
      isf:'',
      target: ''
    }
  });

  useEffect(() => {
    getFromLocal();
  },[])
  const getFromLocal = async () => {
    let data = await AsyncStorage.getItem("auth-key")
    let user = JSON.parse(data).user
    setUserId(user._id)
  }

  const onSubmit = async (data) => {
    let user = await axios.post(`http://localhost:3000/details?id=${userId}`, data)
    setState(user.data)
    await AsyncStorage.setItem('auth-key', JSON.stringify(user.data))
    navigation.navigate("Insulin Calculator")
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex items-center justify-center h-full bg-white">
          <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Sign Up")}/>
          <View>
            <Text className="text-3xl mb-10 font-extrabold text-[#0b3866]">Lets Gather Some Data</Text>
          </View>
          <Controller
              control={control}
              rules={{required: true}}
              render={({
                field:{onChange, onBlur, value, name}
              }) => (
                <View className="flex justify-center items-start w-full px-10 mt-5">
                  <Text className="text-lg font-medium">Insulin Sensitivity Factor:</Text>
                  <TextInput className="w-full rounded"
                    mode="outlined"
                    placeholder="Enter ISF"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    activeOutlineColor="#1565C0"
                    left={<TextInput.Icon icon="needle"/>}
                  />
                </View>
              )}
              name="isf"
            />
            <Controller
              control={control}
              rules={{required: true}}
              render={({
                field:{onChange, onBlur, value, name}
              }) => (
                <View className="flex justify-center items-start w-full px-10 mt-5">
                  <Text className="text-lg font-medium">Carb Ratio:</Text>
                  <TextInput className="w-full rounded"
                    mode="outlined"
                    placeholder="Enter carb ratio"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    right={<TextInput.Affix text="grams"/>}
                    left={<TextInput.Icon icon="bread-slice-outline"/>}
                    activeOutlineColor="#1565C0"
                  />
                </View>
              )}
              name="carbRatio"
            />
            <Controller
              control={control}
              rules={{required: true}}
              render={({
                field:{onChange, onBlur, value, name}
              }) => (
                <View className="flex justify-center items-start w-full px-10 mt-5">
                  <Text className="text-lg font-medium">Target Blood Glucose:</Text>
                  <TextInput className="w-full rounded"
                    mode="outlined"
                    placeholder="Enter target glucose"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="number-pad"
                    right={<TextInput.Affix text="mg/dL"/>}
                    left={<TextInput.Icon icon="diabetes"/>}
                    activeOutlineColor="#1565C0"
                  />
                </View>
              )}
              name="target"
            />
            <Button className="bg-[#0b3866] mt-8 border p-[3px] w-[350px] rounded" onPress={handleSubmit(onSubmit)}>
              <Text className="text-white font-bold">SAVE DATA</Text>
            </Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default InitialDetailsScreen