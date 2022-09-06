import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Dimensions, Image } from "react-native"
import { observer } from "mobx-react-lite"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useRef, useState } from "react"

export interface MyCarouselProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  data?
}
const { width } = Dimensions.get("window")
const SLIDER_WIDTH = width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
/**
 * Describe your component here
 */
export const MyCarousel = observer(function MyCarousel(props: MyCarouselProps) {
  const { data } = props
  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  return (
    <View>
      <Carousel
        autoplay
        autoplayDelay={6}
        loop={true}
        layout="stack"
        layoutCardOffset={18}
        ref={isCarousel}
        data={[...data]?.splice(0, 5)}
        renderItem={({ item, index }) => (
          <View style={styles.container} key={index}>
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/original/" + item.backdropURL }}
              style={styles.img}
            />
          </View>
        )}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={5}
        activeDotIndex={index}
        carouselRef={isCarousel}
        containerStyle={{ height: 61 }}
        dotStyle={{
          width: 20,
          height: 10,
          borderRadius: 10,
          backgroundColor: "#f09408",
        }}
        inactiveDotStyle={{
          width: 15,
          height: 15,
          backgroundColor: "#f09408",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  )
})
const styles = StyleSheet.create({
  flastlist: {
    // backgroundColor: "white",
  },
  img: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 15,
    resizeMode: "center",
  },
  text: { fontSize: width * 0.5, textAlign: "center" },
  container: {
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
})
