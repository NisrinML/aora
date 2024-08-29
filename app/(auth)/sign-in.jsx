import { View, Text,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit=()=>{

  }
  return (
   <SafeAreaView className="bg-back-light h-full">
<ScrollView>
  <View className="w-full justify-center min-h-[85vh] px-4 my-6">
<Image
source={images.logo}
resizeMode='contain' className="w-[115px] h-[35px]"
/>
<Text className="text-2xl text-white mt-10 font-[serif]">Log in to Aora</Text>
<FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
  <CustomButton
    title="Sign In"
    handelPress={submit}
    containerStyles="mt-7"
    isLoading={isSubmitting}
  />
  <View className="justify-center pt-5 flex-row gap-2">
  <Text className="text-base text-chatbg-light font-Georgia">
    Don't have account?
  </Text>
  <Link href="/sign-up" className='text-base text-change-button-light font-Georgia'>Sign Up</Link>
  </View>
  </View>
  </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn