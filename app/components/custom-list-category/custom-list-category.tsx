import * as React from "react"
import { FlatList, StyleSheet, View, TouchableOpacity, Animated,Text } from "react-native"
import { observer } from "mobx-react-lite"
// import { color, typography } from "../../theme"
import { useRef } from "react"

// const CONTAINER: ViewStyle = {
//   justifyContent: "center",
// }

// const TEXT: TextStyle = {
//   fontFamily: typography.primary,
//   fontSize: 14,
//   color: color.primary,
// }

export interface CustomListCategoryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data?
  onPress?
}

/**
 * Describe your component here
 */
export const CustomListCategory = React.memo(observer(function CustomListCategory(
  props: CustomListCategoryProps,
) {
  const { data } = props
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.flastlist}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.genres} onPress={() => {props.onPress(item.id)}}>
            <Text style={styles.genre}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        key="{item.id}"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
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
    fontWeight: 'bold',
    fontSize: 16,
    color: "#ffffff",
  },
})
