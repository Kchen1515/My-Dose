import { View, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useLayoutEffect, useState, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories.jsx'
import {TextInput, Button, IconButton} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"


const CalculatorScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [carbRatio, setCarbRatio] = useState(0)
  const [target, setTarget] = useState(0)
  const [isf, setIsf] = useState(0)
  const [total, setTotal] = useState()
  useEffect(() => {
    getFromLocal();
  },[])

  const getFromLocal = async () => {
    let data = await AsyncStorage.getItem("auth-key")
    console.log("looking at data" + data)
    let user = JSON.parse(data).user
    console.log('This is the user' + user)
    console.log('looking at user' + user)
    let userId = user._id
    const result = await axios.get(`http://localhost:3000/user?id=${userId}`)
    setEmail(result.data.email)
    setCarbRatio(result.data.initial[0].carbRatio)
    setIsf(result.data.initial[0].isf)
    setTarget(result.data.initial[0].target)
    console.log(result.data)
  }

  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      carbsEaten: '',
      current:''
    }
  });



  const onSubmit = (data) => {
    const carbCalc = Number(data.carbsEaten) / carbRatio;
    const insulinCalc = (Number(data.current) - target) / isf;

    setTotal(Math.ceil(carbCalc + insulinCalc))
    Keyboard.dismiss()
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="h-full justify-center items-center flex bg-blue-600">
          <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Initial Details")}/>
          <Text>{email}</Text>
          <View>
            <Text className=" mb-5 text-white font-extrabold text-4xl text-center"> Quickly Calculate Bolus Dose</Text>
          </View>
          <View className="flex w-full justify-between items-center mb-10">
            <View className="flex items-center ">
              <Text className="text-center mb-2 text-xl font-medium text-white">Carbohydrate Ratio</Text>
              <View className= "border border-white rounded-full w-[60px] h-[60px] flex items-center justify-center ">
                <Text className="text-white text-2xl font-extrabold">{carbRatio}</Text>
              </View>
            </View>
            <View className="flex items-center mt-5 ">
              <Text className="text-center mb-2 text-xl font-medium text-white">Target Blood Glucose</Text>
              <View className= "border border-white rounded-full w-[60px] h-[60px] flex items-center justify-center ">
                <Text className="text-white text-2xl font-extrabold">{target}</Text>
              </View>
            </View>
            <View className="flex items-center mt-5 ">
              <Text className="text-center mb-2 text-xl font-medium text-white">Insulin Sensitivity Factor</Text>
              <View className= "border border-white rounded-full w-[60px] h-[60px] flex items-center justify-center ">
                <Text className="text-white text-2xl font-extrabold">{isf}</Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row w-full justify-evenly">
            <Controller
                control={control}
                rules={{required: true}}
                render={({
                  field:{onChange, onBlur, value, name}
                }) => (
                  <View className="flex justify-center items-center">
                    <Text className="text-lg text-white">Carbohydrates Eaten</Text>
                    <TextInput className="rounded w-[125px]"
                      mode="outlined"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      keyboardType='number-pad'
                      right={<TextInput.Affix text="grams"/>}

                    />
                  </View>
                )}
                name="carbsEaten"
              />
            <Controller
                control={control}
                rules={{required: true}}
                render={({
                  field:{onChange, onBlur, value, name}
                }) => (
                  <View className="flex justify-center items-center">
                    <Text className="text-lg text-white">Current Blood Glucose</Text>
                    <TextInput className="rounded w-[125px]"
                      mode="outlined"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      autoCompleteType="email"
                      keyboardType='number-pad'
                      right={<TextInput.Affix text="mg/dL"/>}
                    />
                  </View>
                )}
                name="current"
              />
          </View>
          <Button className="border-2 border-white p-1 bg-transparent w-[150px] rounded flex items-center justify-center mt-10 mb-10" onPress={handleSubmit(onSubmit)}>
            <Text className="text-white font-extrabold text-xl">Calculate</Text>
          </Button>
          <View className="flex items-center justify-center">
            <Text className="text-white text-4xl font-extrabold">{total}</Text>
            <Text className="text-3xl font-bold text-white">Units of Insulin</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default CalculatorScreen