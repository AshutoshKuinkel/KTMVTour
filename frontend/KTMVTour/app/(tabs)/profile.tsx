import { View, Text, ImageBackground, Button } from 'react-native'
import React from 'react'


const profile = () => {
  return (
    <View className='flex-1 items-center bg-black'>
      <Text className='text-4xl font-bold text-white mt-14'>Profile</Text>
      <Button title='logout'/>
    </View>
  )
}

export default profile