import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, StyleSheet, Text, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { MyCarousel, CustomButton, CustomButtonOutLine } from "../../components"
import Icon from "react-native-vector-icons/FontAwesome5"
import { CustomListCategory } from "../../components/custom-list-category/custom-list-category"
import { CustomListMovies } from "../../components/custom-list-movies/custom-list-movies"
import { useStores } from "../../models"

// @ts-ignore

function Header(props) {
    return (<View style={styles.header}>
          <CustomButton name={"align-left"} size={34} />
          <View style={styles.title}>
            <Icon name="film" style={styles.logo} />
            <Text style={styles.titleText}>Movie</Text>
          </View>
          <View style={styles.searchAndCart}>
            <CustomButtonOutLine name={"search-outline"} onPress={props.onPressSearch} />
            <CustomButtonOutLine name={"cart-outline"} />
          </View>
        </View>);
}

// @ts-ignore
export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  function HomeScreen({ navigation }) {
    const rootStore = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const onPressSearch = () => {
      navigation.navigate("filter")
    }
    const onPressDetails = (id: number) => {
      navigation.navigate("details", id)
    }
    const onPressCategory = (id: number) => {
      navigation.navigate("category", id)
    }

    return (
      <ScrollView style={styles.root}>
        <Header onPressSearch={onPressSearch}></Header>
        <MyCarousel data={rootStore.homeStore.home} />
        <CustomListCategory data={rootStore.genresStore.genres} onPress={onPressCategory} />
        <CustomListMovies
          text="Top Rated"
          data={rootStore.homeStore.topRate}
          onPress={onPressDetails}
        />
        <CustomListMovies
          text="Coming Soon"
          data={rootStore.homeStore.upComing}
          onPress={onPressDetails}
        />
        <CustomListMovies
          text="Popular"
          data={rootStore.homeStore.popular}
          onPress={onPressDetails}
        />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    )
  },
)
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#364042",
    flex: 1,
  },
  header: {
    // position: "absolute",
    // top: 100,
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
  searchAndCart: {
    flexDirection: "row",
  },
})
