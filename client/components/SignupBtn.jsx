import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const SignupBtn = ({onPress, send}) => {

  return (
    <Pressable onPress={send} className="border bg-red-600 p-1 mt-9 px-5 py-2" >
      <Text className="text-white font-semibold">Sign Up</Text>
    </Pressable>
  );
}

export default SignupBtn;