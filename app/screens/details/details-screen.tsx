import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  Cast,
  CustomButton,
  CustomButtonOutLine,
  CustomDescription,
  Videos,
} from "../../components"
import Icon from "react-native-vector-icons/FontAwesome5"
import { TabView, SceneMap } from "react-native-tab-view"
import { useStores } from "../../models"
import { useNavigation, useRoute } from "@react-navigation/native"

export const DetailsScreen: FC<StackScreenProps<NavigatorParamList, "details">> = observer(
  function DetailsScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    // Pull in one of our MST stores
    const [favoriteList, setFavoriteList] = useState([])

    const onFavorite = (favorite) => {
      setFavoriteList([...favoriteList, favorite])
    }
    const onRemoveFavorite = (favorite) => {
      const filteredList = favoriteList.filter((item) => item.id !== favorite.id)
      setFavoriteList(filteredList)
    }
    const ifExists = (favorite) => {
      if (favoriteList.filter((item) => item.id === favorite.id).length > 0) {
        return true
      }
      return false
    }


    const rootStore = useStores()
    const id: any = route.params
    const onPressBack = () => {
      navigation.goBack()
    }
    const fetchDetails = () => {
      rootStore.detailStore.getDetail(id)
      rootStore.detailStore.getVideos(id)
      rootStore.castStore.getCast(id)
    }
    const data = rootStore.detailStore.details
    useEffect(() => {
      fetchDetails()
    }, [id])

    const Description = () => (
      <ScrollView style={{ flex: 1 }}>
        <CustomDescription data={data} />
        <View style={{ borderWidth: 0.5, borderColor: "white", margin: 10 }} />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          Cast
        </Text>
        <Cast data={rootStore.castStore.cast} />
      </ScrollView>
      // <View style={{ flex: 1 }}>
      // </View>
    )
    const Comments = () => (
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ alignSelf: "center", color: "white", justifyContent: "center" }}>
          Comments
        </Text>
      </ScrollView>
    )

    const renderScene = SceneMap({
      description: Description,
      comments: Comments,
    })
    const layout = useWindowDimensions()
    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
      { key: "description", title: "Description" },
      { key: "comments", title: "Comments" },
    ])
    const renderTabBar = () => {
      return (
        <View style={styles.tabBar}>
          {routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={route.key}
                style={[styles.tabItem, index === i ? styles.tabLine : {}]}
                onPress={() => setIndex(i)}
              >
                <Animated.Text
                  style={[styles.tabview, { color: index === i ? "#f09408" : "white" }]}
                >
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )
    }

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <CustomButton name={"arrow-left"} size={34} onPress={onPressBack} />
          <View style={styles.title}>
            <Icon name="film" style={styles.logo} />
            <Text style={styles.titleText}>Movie</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("favourite", { favoriteList })}>
            <Text style={{ color: "#f09408", fontWeight: "bold" }}>Favorite List</Text>
          </TouchableOpacity>
        </View>
        <Videos data={rootStore.detailStore.videos} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
          <View style={{ width: width * 0.4, justifyContent: "center" }}>
            <Text style={{ color: "white", marginLeft: 30, fontWeight: "bold", fontSize: 16 }}>
              {data.vote_average} / 10.00
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", width: width * 0.4, justifyContent: "space-around" }}
          >
            <CustomButtonOutLine name="share-social-outline" size={35} />
            <CustomButtonOutLine
              name={ifExists(data) ? "heart" : "heart-outline"}
              size={35}
              onPress={() => (ifExists(data) ? onRemoveFavorite(data) : onFavorite(data))}
            />
            <CustomButtonOutLine name="download-outline" size={35} />
          </View>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width * 5 }}
          renderTabBar={renderTabBar}
        />
      </View>
    )
  },
)

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#364042",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 30,
  },
  logo: {
    color: "white",
    fontSize: 50,
    marginHorizontal: 10,
  },
  vid: {
    width: width,
    height: height * 0.3,
    resizeMode: "center",
  },
  tabview: {
    color: "white",
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  tabLine: {
    borderBottomColor: "#f09408",
    borderBottomWidth: 2,
  },
})
