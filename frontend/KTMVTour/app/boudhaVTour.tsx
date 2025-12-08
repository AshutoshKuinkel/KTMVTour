import { View, Text } from "react-native";
import React from "react";
import Video from "react-native-video";
import { router } from "expo-router";
import UnityView from '@azesmway/react-native-unity'

const boudhaVTour = () => {
  return (
    <View style={{ height: "100%", width: "100%" }}>
      {/* <Video
        source={require("../assets/vid/vtour-vid1.mp4")}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        resizeMode="cover"
        paused={false}
        onEnd={()=>{
          router.push('/tours')
        }}
      /> */}
      <UnityView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 1,
          bottom: 1
        }}
      />
    </View>
  );
};

export default boudhaVTour;
