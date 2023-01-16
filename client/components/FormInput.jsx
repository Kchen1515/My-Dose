import React from 'react';
import {View, Text} from 'react-native'
import {TextInput} from 'react-native-paper'
import { useForm, Controller } from "react-hook-form";

const FormInput = ({textInput}) => {
  // Destructuring prop
  const {title, placeholder, autoCapitalize, secureTextEntry, icon, defaultFormValue, key, control } = textInput;
  return (
    <Controller
      key={key}
      control={control}
      rules={{required: true}}
      render={({
        field:{onChange, onBlur, value, name}
      }) => (
        <View className="flex justify-center items-start w-full px-10 mt-5">
          <Text className="text-lg font-medium">{title}</Text>
          <TextInput className="w-full rounded"
            mode="outlined"
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            left={<TextInput.Icon icon={icon} />}
            activeOutlineColor="#1565C0"
          />
        </View>
      )}
      name={defaultFormValue}
    />
  )
}

export default FormInput;