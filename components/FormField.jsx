import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-chatbg-light font-body">{title}</Text>
      <View className="border-2 border-border-light w-full h-16 px-4 bg-status-light
      rounded-2xl focus:border-change-button-light items-center flex-row">
<TextInput
className="flex-1 text-white font-psemibold text-base"
value={value}
placeholder={placeholder}
placeholderTextColor='#7b7b8b'
onChangeText={handleChangeText}
secureTextEntry={title === "Password" && !showPassword}
          {...props}
/>

{title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField