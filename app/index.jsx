import { Redirect,router } from "expo-router";
import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import 'react-native-url-polyfill/auto'
import CustomButton from "../components/CustomButton";
export default function App() {
    return (

        <SafeAreaView className="bg-back-light h-full">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full justify-center
items-center min-h-[90vh] px-4">
                    <Image source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain" />
                    <Image source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode="contain" />
                    <View className="relative mt-5">
                        <Text className="text-2xl text-white font-sans text-center font-[serif]">
                            Discover Endless Possibilities with {' '}
                            <Text className="text-change-button-light"> Aora</Text>
                        </Text>
                        <Image source={images.path}
                            className="w-[90px] h-[15px] absolute -bottom-3 -right-3"
                            resizeMode="contain" />
                    </View>
                    <Text
                        className="text-xs font-body text-chatbg-light mt-7 text-center"
                    >Where creativity meets innovation:
                        embark on a journey of limitless exploration with Aora
                    </Text>
                    <CustomButton
                        title="Continue with Email"
                        containerStyles="w-full mt-7"
                        handelPress={()=>{
                            router.push('/sign-in')
                        }}
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#170B11" style="light"/>
        </SafeAreaView>
    )
}

