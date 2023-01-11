import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Category from './Category.jsx'

const Categories = () => {
  return (
    <ScrollView contentContainerStyle={{
      paddingHorizontal: 15,
      paddingTop: 10
    }}
    horizontal
    showHorizontalScrollIndicator={false}
    >
      <Category/>
      <Category/>
      <Category/>
    </ScrollView>
  )
}

export default Categories