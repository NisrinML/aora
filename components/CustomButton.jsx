import { TouchableOpacity,Text} from 'react-native'
import React from 'react'

const CustomButton = ({title,handelPress,containerStyles,textStyles,isLoading}) => {
  return (
    <TouchableOpacity 
    onPress={handelPress}
    activeOpacity={0.7}
    className={`bg-change-button-light ${containerStyles}
    rounded-xl min-h-[62px] justify-center items-center
  ${isLoading?'opacity-50':''}`}
  disabled={isLoading}>
      <Text className={`text-back-light text-lg font-psemibold
        ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

