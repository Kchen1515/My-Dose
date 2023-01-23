import { View, Text } from 'react-native'
import React, {useEffect, useState, useLayoutEffect, useContext} from 'react'
import { StateContext, Context } from '../context/auth.js'
import {NavigationContainer,useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { format, compareAsc, parseISO } from 'date-fns'
import {IconButton, Menu, Divider, Provider } from 'react-native-paper'



const Log = ({navigation}) => {
  const nav = useNavigation();
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false
    })
  }, [])

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [readingArray, setReadingArray] = useState([])
  const {state, setState} = useContext(Context)


  useEffect(() => {
    getFromLocal();
  },[])

  const getFromLocal = async () => {
    let data = await AsyncStorage.getItem("auth-key")
    let user = JSON.parse(data).user
    let userId = user._id
    const result = await axios.get(`https://e4ef-69-124-242-245.ngrok.io/user?id=${userId}`)
    if(!result){
      alert('Not reading logged currently')
    }
    setState(result.data)
    setReadingArray(result.data.entries)
  }

  return (
    <View className="w-full h-full bg-white flex items-center justify-start">
      <IconButton icon="arrow-left" className="absolute left-0 top-[50px]" onPress={() => navigation.navigate("Insulin Calculator")}/>
      <Text className="mt-[100px] mb-8 font-extrabold text-3xl text-[#0b3866]">Blood Sugar Log</Text>
      <View className="border w-full h-full p-3 flex items-center">
        {
          readingArray.filter((reading) => {
            return reading.reading !== null
          }).map((reading, i) => {
            return (
              <View className="flex flex-row justify-between w-full mb-5" key={i}>
                <Text className="text-[#0b3866]">{format(parseISO(reading.date), "eeee MMMM do")} at {format(parseISO(reading.date), "h:mm a")} </Text>
                <Text className="text-[#0b3866]"><Text className="font-extrabold">{reading.reading}</Text> Units of Insulin</Text>
              </View>
            )
          })
        }
      </View>
    </View>
    // <View>
    //   <Text>{date} at {time} </Text>
    // </View>
  )
}

export default Log;