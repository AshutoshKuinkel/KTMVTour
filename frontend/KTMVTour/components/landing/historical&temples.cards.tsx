import { View, Text } from 'react-native'
import React from 'react'

const CategoryCards = () => {
  return (
    <View className='mt-12 w-[90vw] flex items-center'>
      {/* Cards */}
      <View className='flex-row gap-3 items-center'>
        {/* Card 1 */}
        <View className='bg-post w-[47%] flex items-center justify-center p-8 border border-border rounded-xl'>
          <Text className='text-4xl mb-5 text-center'>🏛️</Text>
          <Text className='text-white font-semibold mb-1 text-center'>Historical Sites</Text>
          <Text className='text-white text-center'>25+ locations</Text>
        </View>

        {/* Card 2 */}
        <View className='bg-post w-[47%] flex items-center justify-center p-8 border border-border rounded-xl'>
          <Text className='text-4xl mb-5 text-center'>🛕</Text>
          <Text className='text-white font-semibold mb-1 text-center'>Temples</Text>
          <Text className='text-white text-center'>15+ sacred sites</Text>
        </View>
      </View>
    </View>
  )
}

export default CategoryCards