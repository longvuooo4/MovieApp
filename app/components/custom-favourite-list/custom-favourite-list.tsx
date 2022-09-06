import * as React from "react"
import {
  Animated,
  FlatList,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import AntDesign from "react-native-vector-icons/AntDesign"

export interface CustomFavouriteListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data?
}
/**
 * Describe your component here
 */
export const CustomFavouriteList = React.memo(observer(function CustomFavouriteList(
  props: CustomFavouriteListProps,
) {
  const { data } = props
  const scrollX = useRef(new Animated.Value(0)).current
  return (
    <FlatList
      data={data}
      style={styles.flatlist}
      renderItem={({ item }) => (
        <View style={styles.child}>
          <Image source={{ uri: "https://image.tmdb.org/t/p/original/" + item.backdrop_path }} style={styles.img}></Image>
          <View style={styles.item}>
            <View style={styles.headerItem}>
              <Text style={styles.name}>{item.title}</Text>
              <TouchableOpacity>
                <AntDesign name="heart" style={styles.heart} />
              </TouchableOpacity>
            </View>
            <Text numberOfLines={8} style={styles.content}>
              {item.overview}
            </Text>
          </View>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      keyExtractor={(item) => item.id}
      key="{item.id}"
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: false,
      })}
      scrollEventThrottle={32}
    />
  )
}))
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
  flatlist: {
    margin: 10,
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  child: {
    margin: 10,
    flexDirection: "row",
  },
  img: {
    width: 150,
    height: 200,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: width * 0.45,
  },
  item: {
    marginHorizontal: 10,
    width: width * 0.5,
  },
  heart: {
    fontSize: 24,
    color: "#f09408",
  },
  content: {
    color: "#ffff",
  },
})
