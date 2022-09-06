import * as React from "react"
import { FlatList, StyleSheet, TouchableOpacity, Image, Text, View } from "react-native"
import { observer } from "mobx-react-lite"

export interface CategoryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  data?
  onPress?: (id: number) => void
}

/**
 * Describe your component here
 */
export const Category = React.memo(observer(function Category(props: CategoryProps) {
  const { data } = props

  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            style={styles.child}
            onPress={() => {
              props.onPress(item.id)
            }}
          >
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/original/" + item.imgURL }}
              style={styles.img}
            ></Image>
            <Text numberOfLines={1} style={styles.name}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={32}
      />
    </View>
  )
}))
const styles = StyleSheet.create({
  root:{
    flex: 1,
    alignItems: "center",
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  child: {
    width: 150,
    margin: 15,
  },
  img: {
    width: 150,
    height: 200,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  name: {
    alignSelf: "center",
    color: "#ffff",
  },
  line: {
    borderWidth: 0.5,
    borderColor: "white",
    margin: 10,
  },
})
