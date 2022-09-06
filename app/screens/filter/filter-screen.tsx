import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { CustomButton, CustomSearch, Screen } from "../../components"
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Keyboard } from "react-native"
import Config from "react-native-config"
// import { useNavigation } from "@react-navigation/native"
// import { color } from "../../theme"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `filter: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="filter" component={FilterScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FilterScreen: FC<StackScreenProps<NavigatorParamList, "filter">> = observer(
  function FilterScreen({ navigation }) {
    // Pull in one of our MST stores
    // const rootStore = useStores()
    const onPressX = () => {
      navigation.navigate("home")
      setSearch("")
      setFilterData([])
    }

    const [search, setSearch] = useState("")
    const [filterData, setFilterData] = useState([])

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Config.TMDB_API_BASE_URL}/search/movie?query=${search}&api_key=${Config.TMDB_API_KEY}`,
        )
        Keyboard.dismiss()
        const json = await response.json()
        setSearch(json.results)
        setFilterData(json.results)
      } catch (error) {
        console.error(error)
      }
    }
    const onPressedSeeMore = (id) => {
      navigation.navigate("details", id)
    }
    const ItemView = ({ item }) => {
      return (
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Image
            source={{ uri: "https://image.tmdb.org/t/p/original/" + item.poster_path }}
            style={styles.img}
          />
          <View>
            <Text style={styles.itemStyle}>{item.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text numberOfLines={1} style={styles.content}>
                {item.overview}
              </Text>
              <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => onPressedSeeMore(item.id)} >
                <Text style={styles.seeMore}>See more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    const ItemSeparatorView = () => {
      return (
        // Flat List Item Separator
        <View
          style={{
            height: 0.5,
            width: "100%",
            backgroundColor: "#C8C8C8",
          }}
        />
      )
    }

    return (
      <Screen style={styles.root} preset="fixed">
        <View style={styles.header}>
          <CustomButton name={"times"} size={34} onPress={onPressX} />
        </View>
        <View>
          <CustomSearch onChangeText={setSearch} value={search} onPress={fetchData} />
        </View>
        <View style={styles.yourRecent}>
          <Text style={styles.recentText}>Your recent searches:</Text>
        </View>
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString() }
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        <View style={{ height: 50 }}></View>
      </Screen>
    )
  },
)
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#312F2F",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  yourRecent: {
    margin: 10,
  },
  recentText: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemStyle: {
    padding: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
  img: {
    width: 70,
    height: 100,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  content: {
    padding: 10,
    color: "white",
    width: 230,
  },
  seeMore: {
    color: "#f09408",
  },
})
