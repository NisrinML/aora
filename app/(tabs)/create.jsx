import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const Create = () => {
  const [uploading,setUploading]=useState(false)
  const {user}=useGlobalContext()
  const [form,setForm]=useState({
    title:'',
    video:null,
    thumbnail:null,
    prompt:''
  })
  const openPicker=async(selectType)=>{
    const result=await ImagePicker.launchImageLibraryAsync({
      mediaTypes:selectType==='image'?ImagePicker.MediaTypeOptions.Images:
      ImagePicker.MediaTypeOptions.Videos,
      aspect:[4,3],
      quality:1
    })

    if(!result.canceled){
      if(selectType==='image')
        setForm({...form,
          thumbnail:result.assets[0]
        })

        if(selectType==='video')
          setForm({...form,
            video:result.assets[0]
          })
    }else{
      setTimeout(()=>{
        Alert.alert('Document picked',
          JSON.stringify(result,null,2)
        )
      },100)
    }
  }

  const submit=async()=>{
    if(!form.prompt|| !form.thumbnail || form.title || form.video)
    {
      Alert.alert('Please fill in all the field.')
    }
    setUploading(true)
    try{
        await createVideo({...form,userId:user.$id})
        Alert.alert('Success','Post uploaded successfully.')
        router.push('/home')
      }catch(error){
        Alert.alert('Error',error.message)
    }finally{
      setForm({
        title:'',
        video:null,
        thumbnail:null,
        prompt:''
      })
      setUploading(false)
    }
  }
  return (
    <SafeAreaView className="bg-back-light h-full">
     <ScrollView className="px-4 my-6">
<Text className="text-2xl text-white  font-[serif]">
  Upload Video
</Text>
<FormField
title="Video Title"
value={form.title}
placeholder="Give your video a catch title ..."
handleChangeText={(e)=>setForm({...form,
  title:e}
)}
otherStyles="mt-10"
/>
<View className="mt-7 space-y-2">
  <Text className="text-base text-chatbg-light font-body">
    Upload Video
  </Text>
  <TouchableOpacity
  onPress={()=>openPicker('video')}
  >
    {form.video?(
        <Video
          source={{uri:form.video.uri}}
          className="w-full h-64 rounded-2xl"
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
        />
      ):(
        <View className="w-full h-40 px-4 bg-status-light rounded-2xl
        justify-center items-center">
            <View className="w-14 h-14 border border-dashed
            border-change-button-light justify-center items-center">
                <Image source={icons.upload}
                resizeMode='contain'
                className="w-1/2 h-1/2"/>
            </View>
        </View>
      )}
  </TouchableOpacity>
</View>
<View className="mt-7 space-y-2">
<Text className="text-base text-chatbg-light font-body">
    Thumbnail Image
  </Text>
  <TouchableOpacity
   onPress={()=>openPicker('image')}>
    {form.thumbnail?(
      <Image
      source={{uri:form.thumbnail.uri}}
      resizeMode='cover'
      className="w-full h-64 rounded-2xl"/>
      ):(
        <View className="w-full h-16 px-4 bg-status-light rounded-2xl
        justify-center items-center border-2 border-status-light
        flex-row space-x-2">
           <Image source={icons.upload}
           resizeMode='contain' className="w-5 h-5"/>
           <Text className="text-sm text-chatbg-light font-body">Choose a file</Text>
        </View>
      )}
  </TouchableOpacity>
</View>
<FormField
title="AI Prompt"
value={form.prompt}
placeholder="Prompt you used in this video"
handleChangeText={(e)=>setForm({...form,
  prompt:e}
)}
otherStyles="mt-7"
/>
<CustomButton
title="Submit & Publish"
handelPress={submit}
containerStyles="mt-7"
isLoading={uploading}
/>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Create