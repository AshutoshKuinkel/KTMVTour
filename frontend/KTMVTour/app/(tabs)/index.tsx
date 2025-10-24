import { View, ScrollView } from "react-native";
import Heading from "../../components/landing/heading";
import TakeToLandmark from "../../components/landing/take2landmark-card";
import InteractiveMapCard from "../../components/landing/interactiveMap-card";
import FeaturedPosts from "../../components/landing/featured-posts";
import ShareExperienceCard from "../../components/landing/share-experience.card";
import CategoryCards from "../../components/landing/historical&temples.cards";

export default function Index() {
  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      scrollEventThrottle={16}
    >
      <View className="flex-1 items-center pt-10 pb-12 bg-black min-h-screen">
        {/* Page heading */}
        <Heading />

        {/* Take me to landmark card */}
        <TakeToLandmark />

        {/* Interactive map card */}
        <InteractiveMapCard />
      </View>

      <View className="flex-1 bg-black pb-8">
        {/* Check what's hot today posts */}
        <FeaturedPosts />
      </View>

      <View className="flex-1 items-center bg-black pb-8">
        {/* Share your experience {post/checkIn} card */}
        <ShareExperienceCard/>

        {/* Category Cards */}
        <CategoryCards/>
      </View>
    </ScrollView>
  );
}
