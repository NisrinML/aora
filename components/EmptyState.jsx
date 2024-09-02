import { View, Text,Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title,subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
        <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode='contain'
        />       
        <Text className="text-xl  font-[serif] text-white mt-2">{title}</Text>
           
            <Text
                className="font-body text-chatbg-light text-sm "
              >{subtitle}</Text>
       <CustomButton
        title="Create Video"
        handelPress={()=>router.push('/create')}
        containerStyles="w-full my-5"
       />
    </View>
  )
}

export default EmptyState