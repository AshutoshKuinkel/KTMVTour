import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import LoginForm from '../components/auth/login.form'

const profile = () => {
  return (
    <View className='flex-1 items-center bg-black'>
      <ImageBackground source={require('../../assets/sample-images/form-bg.png')} className='h-full w-full'>
        <View className='flex items-center justify-center h-screen'>
          {/* Intro text */}
          <View className='text-center flex items-center gap-2'>
            <Text className='text-white text-4xl font-semibold'><Text className='animate-pulse'>📍</Text>KTMVTour</Text>
            <Text className='text-secondary text-lg'>Join thousands of travelers exploring Kathmandu</Text>
          </View>

          <LoginForm/>
        </View>
      </ImageBackground>
    </View>
  )
}

export default profile