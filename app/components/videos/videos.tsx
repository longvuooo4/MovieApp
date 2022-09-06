import * as React from "react"
import { useWindowDimensions, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
// import Video from 'react-native-video'
import YoutubePlayer from "react-native-youtube-iframe";


export interface VideosProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?
}

/**
 * Describe your component here
 */
export const Videos = observer(function Videos(props: VideosProps) {
  const { data } = props
  const height = useWindowDimensions().height
  const videoId = () =>{
    let key = ""
    data.forEach(item => {
      item.type == "Trailer" ? key = item.key : item.type == "Teaser" ? key = item.key : "PLl99DlL6b4"
    });
    return key
  }
  return (
    <View>
    <YoutubePlayer
      height={height * 0.3}
      videoId={videoId()}
    />
  </View>
  )
})
