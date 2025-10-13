import { View, Text } from 'react-native'
import React from 'react'

const LoginForm = () => {
  return (
    <View className='mt-8 h-[500px] min-w-[60vw] bg-post shadow-2xl border border-border rounded-2xl'>
      <View className='items-center flex-col mt-8'>
        <Text className='text-green-50 text-4xl spacing font-semibold'>Login</Text>
      </View>
    </View>
  )
}

export default LoginForm