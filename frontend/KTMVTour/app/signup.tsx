import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Signup = () => {
  return (
    <View className='flex items-center justify-center h-screen'>
      <Text className='text-4xl font-bold'>Signup Page</Text>
      <Button title='Go Back' onPress={()=>router.back()} />
    </View>
  )
}

export default Signup