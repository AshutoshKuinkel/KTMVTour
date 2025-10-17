import { View, Text, ImageBackground, Button } from 'react-native'
import React from 'react'
import { useAuthStore } from '@/src/store/auth.store'


const profile = () => {
  const {logout} = useAuthStore()

  const handlelogout = ()=>{
    logout()
  }
  return (
    <View className='flex-1 items-center bg-black'>
      <Text className='text-4xl font-bold text-white mt-14'>Profile</Text>
      <Button title='logout' onPress={handlelogout}/>
    </View>
  )
}

export default profile