import * as React from "react"
import { StyleSheet, FlatList, TouchableOpacity, View, Image, Text } from "react-native"
import { observer } from "mobx-react-lite"
// import { color, typography } from "../../theme"

export interface CustomListMoviesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  text: string
  data?
  onPress?

}

/**
 * Describe your component here
 */
export const CustomListMovies = React.memo(observer((props: CustomListMoviesProps)=> {
  const { text, data} = props


  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <FlatList
        data={[...data]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity key={item} style={styles.child} onPress={() => {props.onPress(item.id)}} >
            <Image
              source={{ uri: "https://image.tmdb.org/t/p/original/" + item.imgURL }}
              style={styles.img}
            ></Image>
            <Text numberOfLines={1} style={styles.name}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={32}
      />
      <View style={styles.line}></View>
    </View>
  )
}))
const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  child: {
    width: 150,
    marginLeft: 10,
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
