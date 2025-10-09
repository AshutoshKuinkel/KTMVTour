import { View, Text } from 'react-native'
import { User } from 'lucide-react-native'


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
          <View className=' w-full h-[15%] border-b border-b-border flex-row items-center gap-4 pl-4'>
            <View className='bg-third rounded-full p-2'>
              <User size={30} color={'white'}/>
            </View>
            <View className='flex flex-col gap-1'>
              <Text className='text-white text-lg'>@sarah_explores</Text>
              <Text className='text-secondary'>Swayambhunath Temple</Text>
            </View>
          </View>

          {/* Post image section */}
          <View className='border-b border-b-border h-[55%]'>
            
          </View>

          {/*  */}
        </View>
      </View>

    </View>
  )
}

export default FeaturedPosts