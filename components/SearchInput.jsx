import { View, Text,Image, TextInput, TouchableOpacity,  } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const SearchInput = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  return (

      <View className="border-2 border-border-light w-full h-16 px-4 bg-status-light
      rounded-2xl focus:border-change-button-light items-center flex-row space-x-4">
<TextInput
className="text-base mt-0.5 pb-4 text-white flex-1 font-Georgia"
value={value}
placeholder="Search for a video topic"
placeholderTextColor='#7b7b8b'
onChangeText={handleChangeText}
secureTextEntry={title === "Password" && !showPassword}
          {...props}
/>

<TouchableOpacity>
    <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMede='contain'
    />
</TouchableOpacity>
      </View>

  )
}

export default SearchInput