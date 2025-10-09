import { View, Text,Image, Dimensions } from 'react-native'
import { User,Heart,MessageCircleMore,Forward } from 'lucide-react-native'



const FeaturedPosts = () => {
  const Photo1 = '../../../assets/sample-images/photo1.jpeg'

  return (
    <View className=''>
      {/* Heading + subheading */}
      <View className='flex flex-col pl-4 gap-2'>
        <Text className='text-white text-[1.7rem] font-semibold'>Check out what's hot today 🔥</Text>
        <Text className='text-secondary max-w-[80vw]'>See what fellow travelers are sharing from Kathmandu:</Text>
      </View>

      {/* Post cards */}
      <View className='flex items-center'>
        {/* Post card 1  */}
        <View className="bg-post w-[90vw] mt-6 rounded-2xl border border-border overflow-hidden">
          {/* Top section with username + pfp*/}
          <View className=' w-full h-[12%] border-b border-b-border flex-row items-center gap-4 pl-4'>
            <View className='bg-third rounded-full p-2'>
              <User size={30} color={'white'}/>
            </View>
            <View className='flex flex-col gap-1'>
              <Text className='text-white text-lg'>@sarah_explores</Text>
              <Text className='text-secondary'>Swayambhunath Temple</Text>
            </View>
          </View>

          {/* Post image section */}
          <View className='items-center h-[65%]'>
            <Image source={require(Photo1)} className='w-full h-full object-cover' resizeMode='cover'/>
          </View>

          {/* comments + post section */}
          <View className=' mt-3 rounded-b-2xl'>

            {/* Like + comment section */}
            <View className='flex flex-row gap-3 items-start pl-4'>
              {/* Like button + text */}
              <View className='flex flex-row gap-2 items-center'>
                <Heart color={'#fff'}/>
                <Text className='text-white'>324</Text>
              </View>

              {/* Comment section + text */}
              <View className='flex flex-row gap-2 items-center'>
                <MessageCircleMore color={'#fff'}/>
                <Text className='text-white'>42</Text>
              </View>

              {/* Forward section + text */}
              <View className='flex flex-row gap-2 items-center'>
                <Forward color={'#fff'}/>
                <Text className='text-white'>6</Text>
              </View>
            </View>
          </View>

          {/* Caption section */}
          <View className='pl-4 mt-4'>
            <Text className='text-white line-clamp-3'><Text className='font-bold'>@sarah_explores</Text> Amazing sunrise at the Monkey Temple! 🐒✨</Text>
            <Text className='mt-2 text-secondary'>2hrs ago</Text>
          </View>
        </View>
      </View>

    </View>
  )
}

export default FeaturedPosts