import * as React from "react"
import { Image, View, StyleSheet, FlatList, Text } from "react-native"
import { observer } from "mobx-react-lite"

export interface CastProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data?
}

/**
 * Describe your component here
 */
export const Cast = React.memo(observer(function Cast(props: CastProps) {
  const { data } = props

  return (
    <View style={styles.flastlist}>
      <FlatList
        data={[...data]?.splice(0, 10)}
        renderItem={({ item }) => (
          <View style = {styles.view}>
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/original" + item.profile_path }}
              style={styles.img}
            />
            <Text numberOfLines={1} style={styles.text}>{item.name}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        key="{item.id}"
        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        //   useNativeDriver: false,
        // })}
        scrollEventThrottle={32}
        // onViewableItemsChanged={viewableItemsChanged}
        // viewabilityConfig={viewConfig}
        // ref={slideRef}
      />
    </View>
  )
}))
const styles = StyleSheet.create({
  flastlist: {
    paddingLeft: 8,
  },
  genres: {
    justifyContent: "center",
    backgroundColor: "#190E02",
    alignItems: "center",
    width: 150,
    height: 45,
    marginHorizontal: 2,
    borderColor: "#190E02",
    borderWidth: 1,
    borderRadius: 10,
  },
  genre: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
  view: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  text: {
    color: "white",
    marginVertical: 5
  },
})
