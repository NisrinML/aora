import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,subtitle,containerSTyles,titleStyles}) => {
  return (
    <View className={containerSTyles}>
      <Text className={`text-white text-center font-[serif] ${titleStyles}`}>{title}</Text>
      <Text className="text-sm text-chatbg-light text-center font-body">{subtitle}</Text>
    </View>
  )
}

export default InfoBox