import { View, Text, SafeAreaView, ScrollView, Alert, TouchableOpacity,KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useLayoutEffect, useState, useEffect, useContext, useRef} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import {TextInput, Button, IconButton, Menu, Divider, Provider } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateContext, Context } from '../context/auth.js'
import axios from "axios"


// #0b3866
const CalculatorScreen = ({navigation}) => {
  const [id, setID] = useState('')
  const [firstName, setFirstName] = useState('')
  const [carbRatio, setCarbRatio] = useState(0)
  const [target, setTarget] = useState(0)
  const [isf, setIsf] = useState(0)
  const ref = useRef(0)
  const [total, setTotal] = useState(0)
  const {state, setState} = useContext(Context)

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  useEffect(() => {
    getFromLocal();
  },[])

  const getFromLocal = async () => {
    let data = await AsyncStorage.getItem("auth-key")
    let user = JSON.parse(data).user

    let userId = user._id
    setID(userId)
    const result = await axios.get(`https://e4ef-69-124-242-245.ngrok.io/user?id=${userId}`)
    setFirstName(result.data.firstName)
    setCarbRatio(result.data.initial[0].carbRatio)
    setIsf(result.data.initial[0].isf)
    setTarget(result.data.initial[0].target)
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

  const onSubmit = async (data) => {
    const carbCalc = Number(data.carbsEaten) / carbRatio;
    const insulinCalc = (Number(data.current) - target) / isf;
    const result = Math.ceil(carbCalc + insulinCalc)
    ref.current = result
    setTotal((prev) => prev + result)

    let user = await axios.post(`https://e4ef-69-124-242-245.ngrok.io/log?id=${id}`,
    {
      date: new Date(),
      reading: ref.current
    }
    )
    if(user.data){
      alert("Logged Calculation Successful")
    } else if (user.data.error){
      alert(user.data.error)
    }
    setState(user.data)
    await AsyncStorage.setItem('auth-key', JSON.stringify(user.data))
    Keyboard.dismiss()
  }

  const signOut = async () => {
    setState({
      token: "",
      user: {key: "value"}
    })
    await AsyncStorage.removeItem('auth-key')
    navigation.navigate("Home")
  }

  const initialValues = [
    {title: "Carbohydrate Ratio",
     value: carbRatio
    },
    {title: "Target Blood Glucose (mg/dL)",
     value: target
    },
    {title: "Insulin Sensitivity Factor",
     value: isf
    }
  ]
  const calculationInputs = [
    {title: "Carbohydrates Eaten",
     text: "grams",
     defaultFormValue: "carbsEaten"
    },
    {title: "Current Blood Sugar",
     text: "md/dL",
     defaultFormValue: "current"
    },
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="h-full justify-center items-center flex bg-white">

          <IconButton icon="logout" onPress={signOut} className="absolute right-0 top-[50px]"/>
          <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Initial Details")}/>
          <IconButton icon="book-open-variant" className="absolute right-12 top-[50px]" onPress={() => navigation.navigate("Log")}/>
          <View className=" flex items-center h-[80px] justify-between mb-5 mt-10">
            <Text className="text-[#0b3866] font-extrabold text-4xl">Welcome <Text className="text-[#357BBD]">{firstName}</Text></Text>
             <Text className="text-[#0b3866] font-extrabold text-2xl">Calculate Your Bolus Dose</Text>
          </View>
          <View className="flex w-full justify-between items-center mb-10">
            {
              initialValues.map((eachValue, i) => {
                return (
                  <View className="flex items-center mb-3 " key={i}>
                    <Text className="text-center mb-2 text-xl font-medium text-[#0b3866]">{eachValue.title}</Text>
                    <View className= "border-4 border-[#0b3866] rounded-full w-[60px] h-[60px] flex items-center justify-center ">
                      <Text className="text-[#0b3866] text-2xl font-extrabold">{eachValue.value}</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
          <View className="flex flex-row w-full justify-evenly">
            {
              calculationInputs.map((calculation, i) => {
                return (
                  <Controller
                      key={i}
                      control={control}
                      rules={{required: true}}
                      render={({
                        field:{onChange, onBlur, value, name}
                      }) => (
                        <View className="flex justify-center items-center">
                          <Text className="text-lg text-[#0b3866]">{calculation.title}</Text>
                          <TextInput className="rounded w-[125px] border-[#0b3866]"
                            mode="outlined"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType='number-pad'
                            right={<TextInput.Affix text={calculation.text}/>}
                            activeOutlineColor="#1565C0"
                          />
                        </View>
                      )}
                      name={calculation.defaultFormValue}
                    />
                )
              })
            }
          </View>
          <Button className="border-2 border-[#0b3866] p-1 bg-transparent w-[150px] rounded flex items-center justify-center mt-10 mb-10" onPress={handleSubmit(onSubmit)}>
            <Text className="text-[#0b3866] font-extrabold text-xl">Calculate</Text>
          </Button>
          <View className="flex items-center justify-center">
            <Text className="text-[#0b3866] text-4xl font-extrabold">{ref.current}</Text>
            <Text className="text-3xl font-bold text-[#0b3866]">Units of Insulin</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default CalculatorScreen