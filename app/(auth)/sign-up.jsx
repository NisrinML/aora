import { View, Text,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images } from "../../constants"
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '../../lib/appwrite'
const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username:"",
    email: "",
    password: "",
  });

  const submit=()=>{
    createUser();
  }
  return (
   <SafeAreaView className="bg-back-light h-full">
<ScrollView>
  <View className="w-full justify-center min-h-[90vh] px-4 my-6">
<Image
source={images.logo}
resizeMode='contain' className="w-[115px] h-[35px]"
/>
<Text className="text-2xl text-white mt-10 font-[serif]">Sign up to Aora</Text>
<FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
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
    title="Sign Up"
    handelPress={submit}
    containerStyles="mt-7"
    isLoading={isSubmitting}
  />
  <View className="justify-center pt-5 flex-row gap-2">
  <Text className="text-base text-chatbg-light font-Georgia">
    Have an account already?
  </Text>
  <Link href="/sign-in" className='text-base text-change-button-light font-Georgia'>Sign In</Link>
  </View>
  </View>
  </ScrollView>
   </SafeAreaView>
  )
}

export default SignUp