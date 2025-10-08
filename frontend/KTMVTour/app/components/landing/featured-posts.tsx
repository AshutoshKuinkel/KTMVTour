import { View, Text } from 'react-native'
import React from 'react'

const FeaturedPosts = () => {
  return (
    <View className='mt-12'>
      {/* Heading + subheading */}
      <View className='flex flex-col pl-4 gap-2'>
        <Text className='text-white text-[1.7rem] font-semibold'>Check out what's hot today 🔥</Text>
        <Text className='text-secondary max-w-[80vw]'>See what fellow travelers are sharing from Kathmandu:</Text>
      </View>

      {/* Post cards */}
      <View className='flex items-center'>
        {/* Post card 1  */}
        <View className="bg-post w-[90vw] mt-6 rounded-2xl border border-border pb-5 overflow-hidden h-[500px]">
          {/* Top section with username + pfp*/}
          <View className='bg-card w-full h-[15%] border border-b-border'>

          </View>

          {/* Post image section */}
          <View className='border border-b-border h-[55%]'>

          </View>

          {/*  */}
        </View>
      </View>

    </View>
  )
}

export default FeaturedPosts